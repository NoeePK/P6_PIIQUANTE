
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const validator = require('validator');

// Enregistrer un nouvel utilisateur
const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
        // validate: [ validator.isEmail, 'invalid email'],
    },
    password: {
        type: String,
        required: true,
    }
});

// Empêcher l'utilisation du même email
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);