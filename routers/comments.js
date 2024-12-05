const express = require("express");
const router = express.Router();

const { index, show, store, update, modify, destroy } = require("../controllers/commentController");

// Index
router.get('/:postId', index);

// Show
router.get('/:postId/comment/:commentId', show);

// Store
router.post('/:postId', store);

// Update
router.put('/:postId/comment/:commentId', update);

// Modify
router.patch('/:postId/comment/:commentId', modify);

// Delete
router.delete('/:postId/comment/:commentId', destroy);

module.exports = router;