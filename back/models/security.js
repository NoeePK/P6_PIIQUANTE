const mongoose = require('mongoose');

// Créer un schema mot de passe
const passwordValidator = require('password-validator');

const validPassword = new passwordValidator();
// Propriétés du mot de passe
validPassword
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(3)
    .has().not().spaces()
    // Blacklist :
    .is().not().oneOf(['Passw0rd', 'Password123']);

// TESTS
console.log(passwordSchema.validate('validPASS123'));
// => true
console.log(passwordSchema.validate('invalidPASS'));
// => false

// TESTS
console.log(passwordSchema.validate('joke', { list: true }));
// => [ 'min', 'uppercase', 'digits' ]


// Créer schema email

const passwordSchema = mongoose.Schema({
    type: String,
    required: true,
    validPassword: true,
    message: "Votre mot de passe doit contenir : 1 majuscule, 1 minuscule, 1 nombre et 1 caractère spécial.",
})


const emailValidator = require('express-validator');
const emailSchema = new emailValidator();

emailSchema
    .exists()
    .withMessage('Veuillez entrer une adresse mail')
    .isEmail()
    .withMessage('Veuillez entrer une adresse mail valide')

module.exports = mongoose.model('Password', passwordSchema);