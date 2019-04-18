const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/blog-controller')();
const authService = require('../services/auth')();

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

module.exports = router;
