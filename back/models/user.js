const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Créer un schema utilisateur
const userSchema = mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Empêcher l'utilisation du même email
userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);