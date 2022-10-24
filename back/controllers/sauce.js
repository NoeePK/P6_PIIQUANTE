// Récupération du modèle
const Sauce = require('../models/sauce');
// Récupération du module pour les images
const fs = require('fs');

// *****************************************
// Récupération de toutes les sauces
// *****************************************

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((sauces) => res.status(200).json(sauces))
        .catch((error) => res.status(400).json({ error }));
};

// *****************************************
// Récupération d'une sauce
// *****************************************

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => res.status(200).json(sauce))
        .catch((error) => res.status(404).json({ error }));
};

// *****************************************
// Création d'une sauce
// *****************************************

exports.createSauce = (req, res, next) => {
    // Récupérer données du front
    const sauceObject = JSON.parse(req.body.sauce);
    // Supprimer id en surplus
    delete sauceObject._id;
    delete sauceObject._userId;
    // Créer une sauce
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        // Générer une URL pour l'image
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    // Sauvegarder la sauce
    sauce.save()
        .then(() => { res.status(201).json({ message: 'Sauce enregistrée avec succès' }) })
        .catch(error => res.status(400).json({ error }));
};

// *****************************************
// Modification d'une sauce
// *****************************************

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        // Récupérer infos front de la sauce
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    // Supprimer id en surplus
    delete sauceObject._userId;
    // Sélectionner la bonne sauce
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
            // SI : id actuel n'est pas l'id du créateur
            if (sauce.userId != req.auth.userId) {
                // ALORS : erreur et accès refusé
                res.status(403).json({ message: "Vous n'avez pas l'autorisation nécessaire pour modifier cette sauce" });
            }
            // SINON : id actuel = id créateur
            else {
                // ALORS : Modifications sont enregistrées
                Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce modifiée avec succès' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        // Sauce n'existe pas : erreur 400
        .catch((error) => res.status(400).json({ error }));
};


// *****************************************
// Suppression d'une sauce
// *****************************************

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            // SI : id actuel n'est pas l'id du créateur
            if (sauce.userId != req.auth.userId) {
                // ALORS : erreur et accès refusé
                res.status(401).json({ message: "Vous n'avez pas l'autorisation nécessaire pour supprimer cette sauce" })
            }
            // SINON : id actuel = id créateur
            else {
                // ALORS : supprimer image de BDD
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    // Supprimer sauce de la BDD
                    Sauce.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: 'Sauce supprimée avec succès' }))
                        .catch(error => res.status(401).json({ error }))
                });
            }
        })
        .catch(error => res.status(500).json({ error })
        );
};





// WIP : système de likes
exports.voteForSauce = (req, res, next) => {
// SI user likes sauce ALORS ajout un like dans tableau usersLikes
// SINON SI user dislikes sauce ALORS ajout 1 dislike dans le tableau usersDislike
// SINON user supprime son vote ALORS vérifier userId et faire -1 dans le tableau correspondant
};