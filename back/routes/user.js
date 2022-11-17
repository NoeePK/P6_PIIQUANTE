const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Sécurité
const strongPassword = require('../middleware/password')
const maxLoginAttempts = require('../middleware/rateLimiter');
const slowDown = require('../middleware/speedLimiter');

// Créer un nouvel utilisateur
router.post('/signup', strongPassword, slowDown, userCtrl.signup);
// Connecter un utilisateur
router.post('/login', maxLoginAttempts, userCtrl.login);

module.exports = router;