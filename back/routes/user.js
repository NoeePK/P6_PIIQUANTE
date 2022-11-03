const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const attempts = require('../middleware/rateLimiter');

// Créer un nouvel utilisateur
router.post('/signup', userCtrl.signup);
// Connecter un utilisateur
router.post('/login', attempts.rateLimit, userCtrl.login);

module.exports = router;