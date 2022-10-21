// Importer express
const express = require('express');
// Créer router
const router = express.Router();
// Importer les contrôleurs
const userCtrl = require('../controllers/user');


// Il faut que le point d'accès continne aussi "auth"???
// Créer un nouvel utilisateur
router.post('/signup', userCtrl.signup);
// Connecter un utilisateur
router.post('/login', userCtrl.login);

// Exporter le router
module.exports = router;