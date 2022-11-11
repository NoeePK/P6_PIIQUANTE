const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const strongPassword = require('../middleware/password')
const maxLoginAttempts = require('../middleware/rateLimiter');

// Créer un nouvel utilisateur
router.post('/signup', strongPassword, userCtrl.signup);
// Connecter un utilisateur
router.post('/login', maxLoginAttempts, userCtrl.login);

module.exports = router;