const posts = require("../models/post");//Importa array post

function index(req, res) {
    res.json(posts);
};

function show(req, res) {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < posts.length) {
        res.json(posts[id]);
    }
    else {
        res.status(404).json({
            message: 'Post non trovato'
        })
    }
};
// destroy
function store(req, res) {
    res.send("Creazione di un nuovo post");
}

function update(req, res) {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < posts.length) {
        res.send(`Modifica totale del post con ID:${id}`);
    }
    else {
        res.status(404).json({
            message: 'Post non trovato'
        })
    }
};

function modify(req, res) {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < posts.length) {
        res.send(`Modifica parziale del post con ID:${id}`);
    }
    else {
        res.status(404).json({
            message: 'Post non trovato'
        })
    }
};

function destroy(req, res) {
    const id = parseInt(req.params.id);
    if (id >= 0 && id < posts.length) {
        const deletedPost = posts.splice(id, 1);
        res.send(`Cancellazione del post con ID:${id}`);
    }
    else {
        res.status(404).json({
            message: 'Post non trovato'
        })
    }
};

module.exports = { index, show, store, update, modify, destroy };