const { createPost, getPosts } = require('../models/forumModel');

const createPostController = async (req, res) => {
  try {
    const post = await createPost({ ...req.body, userId: req.user.id });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

const getPostsController = async (req, res) => {
  try {
    const posts = await getPosts();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

module.exports = { createPost: createPostController, getPosts: getPostsController };