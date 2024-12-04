const express = require("express");
const router = express.Router();

const { index, show, store, update, modify, destroy } = require("../controllers/commentController");

// Index
router.get('/:postId', index);

// Show
router.get('/comment/:commentId', show);

// Store
router.post('/', store);

// Update
router.put('/comment/:commentId', update);

// Modify
router.patch('/comment/:commentId', modify);

// Delete
router.delete('/comment/:commentId', destroy);

module.exports = router;