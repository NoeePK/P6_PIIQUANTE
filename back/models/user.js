// Importer mongoose et plugin
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Créer un schema utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true }
});
// !!!! WIP : vérifier si adresse mail valide comme pour p5???

// Appliquer plugin pour empêcher l'utilisation du même email
userSchema.plugin(uniqueValidator);

// Exporter le schema
module.exports = mongoose.model('User', userSchema);