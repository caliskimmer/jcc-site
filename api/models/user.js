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
        password: String,
        roles: {
          type: [String],
          required: true
        },
        blogPosts: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BlogPost'
        }]
      });

    UserSchema.statics.retrieveFromDatabase = async function(userID) {
        try {
            return await this.findOne({_id: userID});
        } catch(err) {
            throw err;
        }
    };

    return mongoose.model('User', UserSchema);
};

