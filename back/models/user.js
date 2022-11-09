const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('express-validator');

const {strongPassword, validation} = require('../middleware/validators');

// Créer un schema utilisateur
const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: validation.checkEmail
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: strongPassword.checkPassword,
            message: "Votre mot de passe doit contenir : 1 majuscule, 1 minuscule, 1 nombre et 1 caractère spécial."
        },
    }
});

// Empêcher l'utilisation du même email
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);