const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const isValidPassword = require('mongoose-custom-validators');

const validatePassword = [
    isValidPassword({
        validator: isValidPassword,
        message: "Votre mot de passe doit contenir : 1 majuscule, 1 minuscule, 1 nombre et 1 caractère spécial."
    })
]

// Créer un schema utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true, validate: validatePassword }
});
// !!!! WIP : vérifier si adresse mail valide comme pour p5???


// Empêcher l'utilisation du même email
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);