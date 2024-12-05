const comments = require("../models/comment");
const posts = require("../models/post");

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
    const postId = parseInt(req.params.postId);
    const commentId = parseInt(req.params.commentId);
    const post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({
            message: 'Post non trovato'
        });
    }
    const comment = comments.find(c => c.id === commentId && c.postId === postId);
    if (!comment) {
        return res.status(404).json({
            message: 'Commento non trovato'
        });
    }
    const { contenuto, autore } = req.body;
    if (contenuto) {
        comment.contenuto = contenuto;
    }
    if (autore) {
        comment.autore = autore;
    }
    res.json(comment);
}
function modify(req, res) {
    const postId = parseInt(req.params.postId);
    const commentId = parseInt(req.params.commentId);
    const post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({
            message: 'Post non trovato'
        });
    }
    const comment = comments.find(c => c.id === commentId && c.postId === postId);

    if (!comment) {
        return res.status(404).json({
            message: 'Commento non trovato'
        });
    }
    const { contenuto, autore } = req.body;
    if (contenuto) {
        comment.contenuto = contenuto;
    }
    if (autore) {
        comment.autore = autore;
    }
    res.json(comment);
}

function destroy(req, res) {
    const { postId, commentId } = req.params;  // Recupera postId e commentId dai parametri dell'URL
    const index = comments.findIndex(c => c.id === parseInt(commentId) && c.postId === parseInt(postId));
    if (index === -1) {
        return res.status(404).json({
            message: 'Commento non trovato'
        });
    }
    comments.splice(index, 1);
    res.status(200).json({
        message: `Commento con ID ${commentId} eliminato con successo dal post con ID ${postId}`
    });
}

module.exports = { index, show, store, update, modify, destroy };