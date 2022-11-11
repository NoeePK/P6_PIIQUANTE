// Récupérer package pour gérer les images
const multer = require('multer');

const express = require('express');
const app = express();

// Définier format des images
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// TESTER
const maxSize = { fileSize: 2000000 }
const upload = multer({ limits: maxSize })

app.post('/upload', upload.single('file'), function (req, res) {
  res.send({ result: 'ok' })
})

app.use(function (err, req, res, next) {
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.send({ result: 'fail', error: { code: 1001, message: 'Fichier trop volumineux' } })
    return 
  }
})


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

module.exports = multer({ storage }).single('image');