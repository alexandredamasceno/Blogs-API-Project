const express = require('express');

const router = express.Router();

const validate = require('../validations/validateBlogPost');
const auth = require('../validations/validateToken');
const blogPostService = require('../services/blogPost');

router.post('/post',
validate.validateTitle,
validate.validateContent,
validate.validateCategoryId,
validate.validateIfCategoryIdExist,
auth.verifyToken,
async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.user;

    const addPost = await blogPostService.addNewPost(id, title, content);

    return res.status(201).json(addPost);
});

router.get('/post',
auth.verifyToken,
async (req, res) => {
    const posts = await blogPostService.getAllPosts();

    return res.status(200).json(posts);
});

router.get('/post/search',
auth.verifyToken,
async (req, res) => {
    const { q } = req.query;

    if (!q) {
        const allPosts = await blogPostService.getAllPosts();

        return res.status(200).json(allPosts);
    }

    const getPost = await blogPostService.getPostByTitleOrContent(q);

    return res.status(200).json(getPost);
});

router.get('/post/:id',
auth.verifyToken,
async (req, res) => {
    const { id } = req.params;

    const getPost = await blogPostService.getPostById(id);

    if (getPost.message) {
        return res.status(404).json(getPost);
    }

    return res.status(200).json(getPost);
});

router.put('/post/:id',
auth.verifyToken,
validate.verifyIfIsRightUser,
validate.validateTitle,
validate.validateContent,
validate.verifyFieldCategoriesIds,
async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedPost = await blogPostService.updatePost(id, title, content);

    return res.status(200).json(updatedPost);
});

router.delete('/post/:id',
auth.verifyToken,
validate.verifyIfIsRightUser,
async (req, res) => {
    const { id } = req.params;

    await blogPostService.deletePost(id);

    // if (deletedPost.message) {
    //     return res.status(404).json(deletedPost);
    // }

    return res.status(204).send();
});

module.exports = router;
