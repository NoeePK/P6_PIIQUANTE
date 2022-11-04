const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const attempts = require('../middleware/limiter');

// Créer un nouvel utilisateur
router.post('/signup', userCtrl.signup);
// Connecter un utilisateur
router.post('/login', userCtrl.login);

// Essai : attempts.rateLimit

module.exports = router;