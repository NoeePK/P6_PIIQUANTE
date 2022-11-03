const Sauce = require('../models/sauce');
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
    // Créer une sauce
    const sauce = new Sauce({
        ...sauceObject,
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
    const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée avec succès' }))
        .catch(error => res.status(401).json({ message: "Vous n'avez pas l'autorisation nécessaire pour modifier cette sauce" }));

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

// *****************************************
// Système de vote
// *****************************************

// WIP : système de likes
exports.voteForSauce = (req, res, next) => {
    // SI user likes sauce ALORS ajout un like dans tableau usersLikes
    // SINON SI user dislikes sauce ALORS ajout 1 dislike dans le tableau usersDislike
    // SINON user supprime son vote ALORS vérifier userId et faire -1 dans le tableau correspondant

    // SI : User aime la sauce
    if (req.body.like === 1) {
        // ALORS : + 1 dans le tableau usersLiked
        Sauce.updateOne(
            { _id: req.params.id }, {
            $inc: { likes: + 1 },
            $push: { usersLiked: req.body.userId }
        })
            .then((sauce) => res.status(200).json({ message: 'Like ajouté avec succès' }))
            .catch(error => res.status(400).json({ error }))
    }
    // SINON SI : User n'aime pas la sauce
    else if (req.body.like === -1) {
        // ALORS : + 1 dans le tableau usersDisliked
        Sauce.updateOne(
            { _id: req.params.id }, {
            $inc: { dislikes: + 1 },
            $push: { usersDisliked: req.body.userId }
        })
            .then((sauce) => res.status(200).json({ message: 'Dislike ajouté avec succès' }))
            .catch(error => res.status(400).json({ error }))
    }
    // SINON : User a déjà voté pour la sauce
    else {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                // SI : userId présent dans userLiked
                if (sauce.usersLiked.includes(req.body.userId)) {
                    // ALORS : - 1 dans usersLiked
                    Sauce.updateOne({ _id: req.params.id }, {
                        $pull: { usersLiked: req.body.userId },
                        $inc: { likes: - 1 }
                    })
                        .then((sauce) => { res.status(200).json({ message: "Like supprimé avec succès" }) })
                        .catch(error => res.status(400).json({ error }))
                }
                // SINON SI : userId présent dans usersDisliked
                else if (sauce.usersDisliked.includes(req.body.userId)) {
                    // ALORS : - 1 dans usersDisliked
                    Sauce.updateOne({ _id: req.params.id }, {
                        $pull: { usersDisliked: req.body.userId },
                        $inc: { dislikes: -1 }
                    })
                        .then((sauce) => { res.status(200).json({ message: "Dislike supprimé avec succès" }) })
                        .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json(' error'))
    }
};