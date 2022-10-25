// Importer les modules et plugins :
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))

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

// Contourner les systèmes de sécurité CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(express.json());

// Routes sauces, utilisateurs et images
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauce', sauceRoutes);
app.use('/api/auth', userRoutes);

// Exporter l'application
module.exports = app;