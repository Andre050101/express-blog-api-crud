const express = require('express');
const router = express.Router(); //Creazione router
const { index, show, store, update, modify, destroy } = require("../controllers/postControllers");//Importa controller di post
//Crud:
//Index (Tutti i post)
router.get('/posts', index);

//Show (Mostra solo un post)
router.get('/posts/:id', show);

//Create (Creazione nuovo post)
router.post('/posts', store);

//Update (Aggiornamento intero post)
router.put('/posts/:id', update);

//Modify (Aggiornamento parziale del post)
router.patch('/posts/:id', modify);

//Destroy (Eliminazione post)
router.delete('/posts/:id', destroy);

module.exports = router;