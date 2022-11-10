const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const strongPassword = require('../middleware/password')
const attempts = require('../middleware/limiter');

// Créer un nouvel utilisateur
router.post('/signup', strongPassword, userCtrl.signup);
// Connecter un utilisateur
router.post('/login', attempts, userCtrl.login);



module.exports = router;