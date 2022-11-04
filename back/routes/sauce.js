const express = require('express');
const router = express.Router();

const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const slowDown = require('../middleware/limiter');


// *****************************************

// Récupération de toutes les sauces
router.get('/', auth, sauceCtrl.getAllSauces);

// Récupération d'une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce);

// Création d'une sauce
router.post('/', auth, slowDown.speedLimiter, multer, sauceCtrl.createSauce);

// Modification d'une sauce
router.put('/:id', auth, slowDown.speedLimiter, multer, sauceCtrl.modifySauce);

// Suppression d'une sauce
router.delete('/:id', auth, sauceCtrl.deleteSauce);

// Système de likes/dislikes
router.post('/:id/like', auth, sauceCtrl.voteForSauce);

// Exporter le router
module.exports = router;