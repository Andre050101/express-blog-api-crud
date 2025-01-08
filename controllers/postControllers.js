import posts from '../models/post.js';//Importa array post

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
    const { titolo, contenuto, tag, image } = req.body;
    console.log("Dati ricevuti dal client:", req.body);
    if (!titolo || !contenuto) {
        return res.status(400).json({
            error: 'titolo e contenuto obbligatori'
        });
    }
    const newPost = {
        id: posts.length + 1,
        title: titolo,
        content: contenuto,
        image: image || null,
        tag: tag
    }
    posts.push(newPost);
    console.log(posts);
    res.status(201).json(newPost);

}

function update(req, res) {
    const id = parseInt(req.params.id);
    const { titolo, contenuto, tag, image } = req.body;
    if (isNaN(id)) {
        return res.status(400).json({
            error: 'ID non valido'
        });
    }
    const post = posts.find(p => p.id === id);
    if (!post) {
        return res.status(404).json({
            error: "Post non trovato"
        });
    }
    if (titolo) {
        post.titolo = titolo;
    }
    if (contenuto) {
        post.contenuto = contenuto;
    }
    if (tag) {
        post.tags = tag;
    }
    if (image) {
        post.image = image;
    }
    res.status(200).json(post);
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

export { index, show, store, update, modify, destroy };