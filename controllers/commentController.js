const comments = require("../models/comment");

function index(req, res) {
    const postId = parseInt(req.params.postId);
    const postComments = comments.filter(comment => comment.postId === postId);
    if (postComments.length === 0) {
        return res.status(404).json({
            message: "Nessun commento trovato per questo post"
        });
    }
    else {
        res.json(postComments);
    }
}

function show(req, res) {
    const commentId = parseInt(req.params.commentId);
    const comment = comments.find(c => c.id === commentId);

    if (!comment) {
        return res.status(404).json({
            message: 'Commento non trovato'
        });
    }
    res.json(comment);
}

function store(req, res) {
    const { postId, contenuto, autore } = req.body;
    const newComment = {
        id: comments.length, // Genera un id semplice
        postId,
        contenuto,
        autore,
        data: new Date()
    };

    comments.push(newComment);
    res.status(201).json(newComment);
}
function update(req, res) {
    const id = parseInt(req.params.id);
    const postId = paresInt(req.params.postId);
    if (id >= 0 && id < comments.length) {
        res.send(`Modifica totale del commento con ID:${id} appartenente al post con id:${postId}`);
    }
    else {
        res.status(404).json({
            message: 'Post non trovato'
        })
    }
}
function modify(req, res) {
    const id = parseInt(req.params.id);
    const postId = paresInt(req.params.postId);
    if (id >= 0 && id < comments.length) {
        res.send(`Modifica parziale del commento con ID:${id} appartenente al post con id:${postId}`);
    }
    else {
        res.status(404).json({
            message: 'Post non trovato'
        })
    }
}

function destroy(req, res) {
    const commentId = parseInt(req.params.commentId);
    const index = comments.findIndex(c => c.id === commentId);

    if (index === -1) {
        return res.status(404).json({ message: 'Commento non trovato' });
    }
    comments.splice(index, 1);
    res.status(204).send(); // No content
}

module.exports = { index, show, store, update, modify, destroy };