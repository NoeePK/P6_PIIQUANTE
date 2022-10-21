// Importer les modules et plugins :
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// Déclarer les routes
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user');

// Connexion à la base de données
mongoose.connect("mongodb+srv://NPK:aUl4B4Fs2iPnSUhx@piiquante.r5oxctm.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB : OK'))
    .catch(() => console.log('Connexion à MongoDB : FAIL'))

// Framework utilisé par l'application 
const app = express();
app.use(express.json());

// Contourner les systèmes de sécurité CORS
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");    
    next();
  });
  

// Routes sauces, utilisateurs et images
app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exporter l'application
module.exports = app;