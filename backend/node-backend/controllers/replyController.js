const { createReply, getRepliesByPost } = require('../models/replyModel');

const createReplyController = async (req, res) => {
  try {
    const reply = await createReply({ ...req.body, userId: req.user.id });
    res.status(201).json(reply);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create reply' });
  }
};

const getRepliesController = async (req, res) => {
  try {
    const replies = await getRepliesByPost(req.params.postId);
    res.json(replies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch replies' });
  }
};

module.exports = { createReply: createReplyController, getRepliesByPost: getRepliesController };