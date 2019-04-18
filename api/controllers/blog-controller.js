const BlogPost = require('../models/blog-post')();
const User = require('mongoose').model('User');
const log = require('../logger');

module.exports = function() {
    let BlogController = {};

    BlogController.createPost = async function(req, res) {
        if (!req.body.title || !req.body.body) {
            return res.json({
               success: false,
               reason: 'body or title missing'
            });
        }

        let post = new BlogPost({
            title: req.body.title,
            body: req.body.body,
            author: req.user.id,
            authorRank: req.user.roles[0]
        });

        try {
            await post.postToDatabase();
            return res.json({
                success: true,
                reason: null
            });
        } catch(err) {
            log.error(`An error occurred while saving object to the database => ${err}`);
            return res.json({
                success: false,
                reason: 'an internal error occurred'
            });
        }
    };

    BlogController.readPosts = async function(req, res) {
        try {
            return res.json({
                success: true,
                posts: await BlogPost.listFromDatabase(),
                reason: null
            });
        } catch(err) {
            log.error(`An error occurred while retrieving posts from database => ${err}`);
            return res.json({
                success: false,
                posts: null,
                reason: 'an internal error occurred'
            });
        }
    };

    BlogController.updatePost = async function(req, res) {
        if (!req.params.id) {
            return res.status(404).json({
                success: false,
                reason: 'no post provided for updating'
            });
        }

        if (!req.body.title && !req.body.body) {
            return res.json({
                success: false,
                reason: 'no updates were made'
            });
        }

        try {
            var user = await User.retrieveFromDatabase(req.user.id);
        } catch (err) {
            log.error(`An error occurred while retrieving user from database => ${err}`);
            return res.json({
                success: false,
                reason: 'an internal error occurred'
            });
        }

        if (user.roles[0] === 'user') {
            return res.status(403).json({
                success: false,
                reason: 'user not permitted to update post'
            });
        }

        try {
            var post = await BlogPost.retrieveFromDatabase(req.params.id);
        } catch(err) {
            log.error(`An error occurred while retrieving post from database => ${err}`);
            return res.json({
                success: false,
                reason: 'an internal error occurred'
            });
        }

        if (!authorizedByRank(user.roles[0], post.author.roles[0])) {
            return res.status(403).json({
                success: false,
                reason: 'user not permitted to update post'
            });
        }

        try {
            if (req.body.title) {
                post.title = req.body.title;
            }
            if (req.body.body) {
                post.body = req.body.body;
            }
            post.updated = Date.now();
            await post.save();
        } catch(err) {
            log.error(`An error occurred while updating blog post => ${err}`);
            return res.json({
                success: false,
                reason: 'an internal error occurred'
            })
        }

        return res.json({
            success: true,
            reason: null
        });
    };

    BlogController.deletePost = async function(req, res) {
        if (!req.params.id) {
            return res.status(404).json({
                success: false,
                reason: 'no post provided for updating'
            });
        }

        try {
            var user = await User.retrieveFromDatabase(req.user.id);
        } catch (err) {
            log.error(`An error occurred while retrieving user from database => ${err}`);
            return res.json({
                success: false,
                reason: 'an internal error occurred'
            });
        }

        if (user.roles[0] === 'user') {
            return res.status(403).json({
                success: false,
                reason: 'user not permitted to delete post'
            });
        }

        try {
            var post = await BlogPost.retrieveFromDatabase(req.params.id);
        } catch(err) {
            log.error(`An error occurred while retrieving post from database => ${err}`);
            return res.json({
                success: false,
                reason: 'an internal error occurred'
            });
        }

        if (!authorizedByRank(user.roles[0], post.author.roles[0])) {
            return res.json({
               success: false,
               reason: 'user not permitted to delete post'
            });
        }

        try {
            await BlogPost.deleteFromDatabase(req.params.id);
        } catch(err) {
            log.error(`An error occurred while retrieving post from database => ${err}`);
            return res.json({
                success: false,
                reason: 'an internal error occurred'
            });
        }

        return res.json({
           success: true,
           reason: null
        });
    };

    // private methods

    let authorizedByRank = function(rank, rankRequired) {
        let rankings = {
            'superadministrator': Infinity,
            'administrator': 0,
            'user': -Infinity
        };

        return (rankings[rank] >= rankings[rankRequired]);
    };

    return BlogController;
};
