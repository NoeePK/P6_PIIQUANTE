// Hasher le mot de passe
const bcrypt = require('bcrypt');
// Attribuer le token
const jwt = require('jsonwebtoken')

// Récupérer le modèle utilisateur
const User = require('../models/User');

// *****************************************
// Inscription d'un utilisateur
// *****************************************
exports.signup = (req, res, next) => {
    // Crypter le mot de passe
    bcrypt.hash(req.body.password, 10)
    // Récupérer mot de passe crypté
    .then(hash => {
        // Création du nouvel utilisateur
        const user = new User({
            email: req.body.email,
            password: hash
        });
        // Enregistrer l'utilisateur dans BDD
        user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé avec succès'}))
        .catch(error => res.status(400).json({error}))
    })
    .catch(error => res.status(500).json({error}))
};

// *****************************************
// Connexion d'un utilisateur
// *****************************************
exports.login = (req, res, next) => {
    // Récupérer utilisateur correspondant à l'adresse mail
    User.findOne({email: req.body.email})
    .then(user => {
        // SI : aucun utilisateur trouvé pour ce mail
        if (user === null) {
            res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
        }
        // SINON : utilisateur trouvé pour ce mail
        else {
            // Comparer mot de passe et le hash dans la BDD
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                // SI : Mot de passe incorrect
                if (!valid) {
                    res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte'})
                }
                // SINON : Mot de passe correct
                else {
                    // ALORS : autoriser l'accès et donner un token
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: '24h'}
                        )
                    });
                }
            })
            .catch(error => res.status(500).json({error}));
        }
    })
    .catch(error => res.status(500).json({error}))
};