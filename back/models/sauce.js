// Importer mongoose
const mongoose = require('mongoose');

// Créer un schema sauce
const ModelsSauce = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    // !!! WIP !!!
    usersLiked: { type: ["String <userId>"] },
    usersDisliked: { type: ["String <userId>"] }
});

// Exporter le schema
module.exports = mongoose.model('Sauce', ModelsSauce);