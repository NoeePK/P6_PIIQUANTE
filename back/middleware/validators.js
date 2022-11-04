// Email unique
const uniqueValidator = require('mongoose-unique-validator');
// Validation email et mot de passe
const { validator } = require('express-validator');
const { checkPassword, checkEmail } = require('express-validator/check');

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


module.exports = { uniqueValidator, validator, validation, checkPassword, checkEmail }