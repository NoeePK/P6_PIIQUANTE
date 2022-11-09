
// Validation email et mot de passe
const validator = require('express-validator');
const checkEmail = require('express-validator/checkEmail');
const checkPassword = require('express-validator/checkPassword');

const validation = [
    checkEmail('email')
        .exists()
        .withMessage('Veuillez entrer une adresse mail')
        .isEmail()
        .withMessage('Veuillez entrer une adresse mail valide'),

    checkPassword('password')
        .exists()
        .isLength({ min: 5 })

]


module.exports = { validator, validation, checkPassword, checkEmail };