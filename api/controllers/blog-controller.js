const BlogPost = require('../models/blog-post')();
const User = require('mongoose').model('User');
const debug = require('debug')('blog-controller');

module.exports = function () {
  let BlogController = {};

  BlogController.createPost = async function (req, res) {
    if (!req.body.title || !req.body.body) {
      return res.json({
        success: false,
        reason: 'body or title missing',
      });
    }

    let post = new BlogPost({
      title: req.body.title,
      body: req.body.body,
      author: req.user.id,
    });

    try {
      await post.postToDatabase();
      return res.json({
        success: true,
        reason: null,
      });
    } catch (err) {
      debug(
        `An error occurred while saving object to the database => ${err}`,
      );
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }
  };

  BlogController.readPosts = async function (req, res) {
    try {
      return res.json({
        success: true,
        posts: await BlogPost.listFromDatabase(),
        reason: null,
      });
    } catch (err) {
      debug(
        `An error occurred while retrieving posts from database => ${err}`,
      );
      return res.json({
        success: false,
        posts: null,
        reason: 'an internal error occurred',
      });
    }
  };

  BlogController.updatePost = async function (req, res) {
    if (!req.body.title && !req.body.body) {
      return res.json({
        success: false,
        reason: 'no updates were made',
      });
    }

    try {
      var user = await User.retrieveFromDatabase(req.user.id);
    } catch (err) {
      debug(
        `An error occurred while retrieving user from database => ${err}`,
      );
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }

    try {
      var post = await BlogPost.retrieveFromDatabase(req.params.id);
    } catch (err) {
      debug(
        `An error occurred while retrieving post from database => ${err}`,
      );
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }

    if (user.role === User.roleMap.USER) {
      if (user.username !== post.author.username) {
        return res.status(403).json({
          success: false,
          reason: `user not permitted to update post`,
        });
      }
    } else {
      if (user.role > post.author.role) {
        return res.status(403).json({
          success: false,
          reason: `user not permitted to update post`,
        });
      }
    }

    try {
      if (req.body.title) {
        post.title = req.body.title;
      }
      if (req.body.body) {
        post.body = req.body.body;
      }
      post.updated = Date.now();
      await post.save().exec();
    } catch (err) {
      debug(`An error occurred while updating blog post => ${err}`);
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }

    return res.json({
      success: true,
      reason: null,
    });
  };

  BlogController.deletePost = async function (req, res) {
    try {
      var user = await User.retrieveFromDatabase(req.user.id);
    } catch (err) {
      debug(
        `An error occurred while retrieving user from database => ${err}`,
      );
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }

    try {
      var post = await BlogPost.retrieveFromDatabase(req.params.id);
    } catch (err) {
      debug(
        `An error occurred while retrieving post from database => ${err}`,
      );
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }

    if (user.role === User.roleMap.USER) {
      return res.status(403).json({
        success: false,
        reason: 'user not permitted to delete post',
      });
    } else if (user.role === User.roleMap.ADMIN) {
      if (
        user.role >= post.author.role &&
        user.username !== post.author.username
      ) {
        return res.status(403).json({
          success: false,
          reason: 'user not permitted to delete post',
        });
      }
    }

    try {
      await BlogPost.deleteFromDatabase(req.params.id);
    } catch (err) {
      debug(
        `An error occurred while retrieving post from database => ${err}`,
      );
      return res.json({
        success: false,
        reason: 'an internal error occurred',
      });
    }

    return res.json({
      success: true,
      reason: null,
    });
  };

  return BlogController;
};
