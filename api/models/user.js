const mongoose = require('mongoose');

module.exports = function() {
    const UserSchema = new mongoose.Schema({
        title: String,
        firstName: String,
        lastName: String,
        username: {
          type: String,
          unique: true,
          required: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
          type: Number,
          required: true
        },
        blogPosts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogPost'
        }]
      });

    UserSchema.methods.deleteFromDatabase = async function() {
        try {
            await this.deleteOne({username: this.username}).exec();
        } catch {
            throw err;
        }
    };

    UserSchema.statics.retrieveFromDatabase = async function(userID) {
        try {
            return await this.findOne({_id: userID}).exec();
        } catch(err) {
            throw err;
        }
    };

    UserSchema.statics.listFromDatabase = async function(userRole) {
        try {
            let filter = {$gte: userRole};
            return await this.find({role: filter}, '-_id -password -blogPosts').exec();
        } catch (err) {
            throw err;
        }
    };

    UserSchema.statics.viewFromDatabase = async function(userID) {
        try {
            return await this.findOne({_id: userID}, '-_id -password -blogPosts').exec();
        } catch (err) {
            throw err;
        }
    };

    UserSchema.statics.getRoleFromNumber = function(roleNumber) {
        switch (parseInt(roleNumber)) {
            case 0:
                return 'superadministrator';
            case 1:
                return 'administrator';
            case 2:
                return 'user';
            default:
                throw 'This should never run';
        }
    };

    UserSchema.statics.roleMap = {
      'SUPERADMIN': 0,
      'ADMIN': 1,
      'USER': 2
    };

    return mongoose.model('User', UserSchema);
};

