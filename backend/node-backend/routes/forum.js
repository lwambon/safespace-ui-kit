/**
 * Forum Routes
 * ------------
 * Endpoints for creating and retrieving forum posts.
 */

const express = require('express');
const router = express.Router();
const { moderationCheck } = require('../middleware/moderationMiddleware');

// Temporary in‑memory store for testing
let posts = [];

// Create a new forum post → moderated
router.post('/', moderationCheck, (req, res) => {
  const { content } = req.body;
  const newPost = { id: posts.length + 1, content };
  posts.push(newPost);
  res.json({ message: "Post accepted", post: newPost });
});

// Update a post (if edits are allowed) → moderated
router.put('/:id', moderationCheck, (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const post = posts.find(p => p.id === parseInt(id));

  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  post.content = content;
  res.json({ message: "Post updated", post });
});

// Fetch all posts → safe, no moderation
router.get('/', (req, res) => {
  res.json(posts);
});

module.exports = router;