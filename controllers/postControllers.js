const posts = require("../models/post");//Importa array post

function index(req, res) {
    const { tag } = req.query; //Estrae tag da query string
    const ris = posts;
    if (tag) {
        ris = posts.filter(post => post.tag.includes(tag.toLowerCase()));
    }
    res.json(ris);
}

function show(req, res) {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (post) {
        res.json(post)
    }
    else {
        res.status(404).json({
            message: "Post non trovato"
        });
    }
}
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
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
        const deletedPost = posts.splice(index, 1);
        console.log("lista aggiornata dei post:", posts);
        res.status(204).send();
    }
    else {
        res.status(404).json({
            message: 'Post non trovato'
        })
    }
};

module.exports = { index, show, store, update, modify, destroy };