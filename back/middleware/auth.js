const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();

// Sécuriser les routes
module.exports = (req, res, next) => {
    try {
        // Récupérer token dans le header
        const token = req.headers.authorization.split(' ')[1];
        // Décoder le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Récupérer l'id dans le token décodé
        const userId = decodedToken.userId;
        // SI : ID n'est pas valable
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non-valide';
        }
        // SINON : ID est valable
        else {
            next();
        }
        // La requête n'est pas authentifiée 
    } catch (error) {
        res.status(401).json({ error : "La requête n'est pas authentifiée" });
    }
};