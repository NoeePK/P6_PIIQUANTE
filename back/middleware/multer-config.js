// Récupérer package pour gérer les images
const multer = require('multer');

// Définier format des images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// TROUVER : Mettre taille maximale !!!

// Indiquer où enregistrer les images
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // Indiquer comment nommer les images
  filename: (req, file, callback) => {
    // Remplacer espaces avec underscore
    const name = file.originalname.split(' ').join('_');
    // Ajouter extension adéquate
    const extension = MIME_TYPES[file.mimetype];
    // Rendre nom unique avec timestamp, ajouter .extension
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Exporter le module
module.exports = multer({ storage }).single('image');