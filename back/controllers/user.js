const bcrypt = require('bcrypt');
const cryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const dotenv = require('dotenv');
const result = dotenv.config();

// *****************************************
// Inscription d'un utilisateur
// *****************************************
exports.signup = (req, res, next) => {
    // Chiffrer l'email
    const emailCryptoJS = cryptoJS.HmacSHA256(req.body.email, `${process.env.CRYPTO_EMAIL}`).toString();
    // Hasher le mot de passe
    bcrypt
        .hash(req.body.password, 10)
        // Récupérer mot de passe crypté
        .then(hash => {
            // Création du nouvel utilisateur
            const user = new User({
                email: emailCryptoJS,
                password: hash
            });
            // Enregistrer l'utilisateur dans BDD
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

// *****************************************
// Connexion d'un utilisateur
// *****************************************
exports.login = (req, res, next) => {
    // Chiffrer l'email
    const emailCryptoJS = cryptoJS
        .HmacSHA256(req.body.email, `${process.env.CRYPTO_EMAIL}`)
        .toString();

    // Récupérer utilisateur correspondant à l'adresse mail
    User.findOne({ email: emailCryptoJS })
        // SI : email n'existe pas
        .then((user) => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur inexistant" })
            }
            // SINON : email existe
            else {
                // Comparer mot de passe et le hash dans la BDD
                bcrypt
                    .compare(req.body.password, user.password)
                    .then((validPassword) => {
                        // SI : Mot de passe est incorrect
                        if (!validPassword) {
                            return res.status(401).json({ message: 'Paire identifiant/mot de passe incorrecte' })
                        }
                        // SINON : Mot de passe est correct
                        else {
                            // ALORS : autoriser l'accès et donner un token
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    `${process.env.JWT_TOKEN}`,
                                    { expiresIn: '24h' }
                                )
                            });
                        }
                    })
            }
        })
        .catch((error) => res.status(500).json({ error }));
}