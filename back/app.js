// Importer les modules et plugins :
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');

// Déclarer les routes
const sauceRoutes = require('./routes/sauce')
const userRoutes = require('./routes/user');

const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// Connexion à la base de données
mongoose.connect("mongodb+srv://NPK:aUl4B4Fs2iPnSUhx@piiquante.r5oxctm.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB : OK'))
    .catch(() => console.log('Connexion à MongoDB : FAIL'))

// Contourner les systèmes de sécurité CORS
app.use(cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));

app.use(express.json());

// Routes sauces, utilisateurs et images
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;