const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blog-controller')();
const UserController = require('../controllers/user-controller')();
const authService = require('../services/auth')();
const emailService = require('../services/email')();

// email
router.post('/contact', emailService.sendContactForm);

// login
router.post('/login', authService.login);
router.get('/test', authService.authenticate, function(req,res) {
    return res.json({success: 'true'});
});

// blog panel
router.get('/blog/posts', BlogController.readPosts);
router.post('/blog/posts/create', authService.authenticate, BlogController.createPost);
router.post('/blog/posts/update/:id', authService.authenticate, BlogController.updatePost);
router.post('/blog/posts/delete/:id', authService.authenticate, BlogController.deletePost);

// users panel
router.get('/users', authService.authenticate, UserController.listUsers);
router.get('/users/:id', authService.authenticate, UserController.viewUser);
router.post('/users/create', authService.authenticate, UserController.createUser);
router.post('/users/update/:id', authService.authenticate, UserController.updateUser);
router.post('/users/delete/:id', authService.authenticate, UserController.deleteUser);

module.exports = router;
