'use strict';

const nodeMailer = require('nodemailer');
const emailValidator = require('email-validator');
const phoneValidator = require('libphonenumber-js');
const striptags = require('striptags');
const axios = require('axios');
const debug = require('debug')('email');

module.exports = function () {
  let email = {};

  // captcha handler helper
  let validateCaptcha = async (token) => {
    let errors = [];

    let response = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        token: token,
      },
    );

    if (response.success === false)
      errors.push('invalid recaptcha token used');
    if (response.score <= 0.5)
      errors.push('recaptcha verification failed');
    if (response.action !== 'homepage')
      errors.push('recaptcha action mismatch');

    return errors;
  };

  // Common form value existence check
  let checkCommonExistence = (req) => {
    let errors = [];

    if (!req.body.firstName) {
      errors.push('first name is missing');
    }
    if (!req.body.lastName) {
      errors.push('last name is missing');
    }
    if (!req.body.email) {
      errors.push('email is missing');
    }
    if (!req.body.phone) {
      errors.push('phone number is missing');
    }
    if (!req.body.message) {
      errors.push('message is missing');
    }
    if (!req.body.recaptchaToken) {
      errors.push('captcha token is missing');
    }

    return errors;
  };

  // Naive date validation helper
  let _validateDate = (date) => {
    const dateArray = date.split('-');
    const DATE_LENGTH = 3;
    if (dateArray.length !== DATE_LENGTH) return false;

    let month = parseInt(dateArray[0]);
    if (isNaN(month)) return false;
    if (month < 1 || month > 12) return false;

    // for sake of simplicity, will naively accept
    // 1 through 31 regardless of the month
    let day = parseInt(dateArray[1]);
    if (isNaN(day)) return false;
    if (day < 1 || day > 31) return false;

    // for sake of simplicity, will accept anything
    // >= 2020
    let year = parseInt(dateArray[2]);
    if (isNaN(year)) return false;
    if (year < 2020) return false;

    return true;
  };

  // Common form value validity check
  let checkCommonValidity = (req) => {
    let errors = [];

    if (!req.body.firstName.match(/^\w+$/)) {
      errors.push('first name is invalid');
    }
    if (!req.body.lastName.match(/^\w+$/)) {
      errors.push('last name is invalid');
    }
    if (!emailValidator.validate(req.body.email)) {
      errors.push('email is invalid');
    }

    // phone validation
    const phoneNumber = phoneValidator.parsePhoneNumberFromString(
      req.body.phone,
      'US',
    );
    if (!phoneNumber || !phoneNumber.isValid()) {
      errors.push('phone number is invalid');
    }

    return errors;
  };

  email.sendBookingForm = async function (req, res) {
    let errors = [];
    const patientTypeOptions = [
      'New Patient',
      'Current Patient',
      'Recurring Patient',
    ];
    const timeOptions = [
      'Prefer Morning',
      'Prefer Afternoon',
      'Prefer Evening',
    ];

    // Check for existence
    errors = errors.concat(checkCommonExistence(req));

    if (!req.body.patientType) {
      errors.push('patient type is missing');
    }
    if (!req.body.date) {
      errors.push('date is missing');
    }
    if (!req.body.preferredTime) {
      errors.push('preferred time is missing');
    }

    // Check for validity
    errors = errors.concat(checkCommonValidity(req));
    if (!_validateDate(req.body.date)) {
      errors.push('date is invalid');
    }
    if (!patientTypeOptions.includes(req.body.patientType)) {
      errors.push('patient type is invalid');
    }
    if (!timeOptions.includes(req.body.preferredTime)) {
      errors.push('preferred time is invalid');
    }

    const message = striptags(req.body.message);

    if (errors.length > 0) {
      return res.json({
        success: false,
        errors: errors,
      });
    }

    // validate recaptcha (place after first error check
    // to prevent extra API call if form data invalid)
    let recaptchaErrors = await validateCaptcha(req.token);
    errors.concat(recaptchaErrors);
    if (errors.length > 0) {
      return res.json({
        success: false,
        errors: errors,
      });
    }

    const messageText =
      `First Name: ${req.body.firstName}\n` +
      `Last Name: ${req.body.lastName}\n` +
      `Patient Type: ${req.body.patientType}\n` +
      `Email: ${req.body.email}\n` +
      `Phone: ${req.body.phone}\n` +
      `Date Requested: ${req.body.date}\n` +
      `Preferred Time: ${req.body.preferredTime}\n` +
      `Message: ${message}`;

    // create transporter object
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // send email using transporter object
    try {
      await transporter.sendMail({
        from: '"JCC Booking Form" <noreply@jogachiropractic.com>',
        to: process.env.EMAIL,
        subject: 'A Patient Has Requested an Appointment!',
        text: messageText,
      });

      return res.json({
        success: true,
      });
    } catch (err) {
      debug(
        `An error occurred while sending email from booking form => ${err}`,
      );
      return res.status(500).json({
        success: false,
        reason: 'an internal error occurred',
      });
    }
  };

  email.sendContactForm = async function (req, res) {
    let errors = [];

    errors = errors.concat(checkCommonExistence(req));
    errors = errors.concat(checkCommonValidity(req));

    if (errors.length > 0) {
      return res.json({
        success: false,
        errors: errors,
      });
    }

    const message = striptags(req.body.message);

    const messageText =
      `First Name: ${req.body.firstName}\n` +
      `Last Name: ${req.body.lastName}\n` +
      `Email: ${req.body.email}\n` +
      `Phone: ${req.body.phone}\n` +
      `Message: ${message}`;

    // create transporter object
    const transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    // send email using transporter object
    try {
      await transporter.sendMail({
        from: '"JCC Contact Form" <noreply@jogachiropractic.com>',
        to: process.env.EMAIL,
        subject: 'A Patient Has Contacted You!',
        text: messageText,
      });

      return res.json({
        success: true,
      });
    } catch (err) {
      debug(
        `An error occurred while sending email from contact form => ${err}`,
      );
      return res.status(500).json({
        success: false,
        reason: 'an internal error occurred',
      });
    }
  };

  return email;
};
