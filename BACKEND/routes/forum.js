/**
 * Forum Routes
 * -----------
 * Endpoints for forum posts and replies
 */

const express = require('express');
const router = express.Router();
const { authenticateJWT } = require('../middleware/authMiddleware');
const { 
  getPosts, 
  getPost, 
  createPost, 
  updatePost, 
  deletePost,
  lockPost,
} = require('../controllers/forumController');
const {
  getReplies,
  createReply,
  updateReply,
  deleteReply,
} = require('../controllers/replyController');

// Post routes
router.get('/posts', getPosts);
router.post('/posts', authenticateJWT, createPost);
router.get('/posts/:id', getPost);
router.put('/posts/:id', authenticateJWT, updatePost);
router.delete('/posts/:id', authenticateJWT, deletePost);
router.patch('/posts/:id/lock', authenticateJWT, lockPost);

// Reply routes
router.get('/posts/:postId/replies', getReplies);
router.post('/posts/:postId/replies', authenticateJWT, createReply);
router.put('/posts/:postId/replies/:replyId', authenticateJWT, updateReply);
router.delete('/posts/:postId/replies/:replyId', authenticateJWT, deleteReply);

module.exports = router;