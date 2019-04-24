const mongoose = require('mongoose');

module.exports = function() {
    const BlogPostSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        },
        updated: Date,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    });

    BlogPostSchema.methods.postToDatabase = async function() {
        try {
            return await this.save().exec();
        } catch(err) {
            throw err;
        }
    };

    BlogPostSchema.statics.listFromDatabase = async function() {
        try {
            return await this.find({}).populate('author', '-password').exec();
        } catch(err) {
            throw err;
        }
    };

    BlogPostSchema.statics.retrieveFromDatabase = async function(postID) {
        if (!postID) {
            throw 'No postID provided';
        }

        try {
            return await this.findOne({_id: postID}).populate('author', '-password').exec();
        } catch(err) {
            throw err;
        }
    };

    BlogPostSchema.statics.deleteFromDatabase = async function(postID) {
        if (!postID) {
            throw 'No postID provided';
        }

        try {
            return await this.deleteOne({_id: postID}).exec();
        } catch(err) {
            throw err;
        }
    }

    return mongoose.model('BlogPost', BlogPostSchema);
};
