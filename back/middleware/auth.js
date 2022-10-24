// Récupérer package pour les tokens
const jwt = require('jsonwebtoken');

// Sécuriser les routes
module.exports = (req, res, next) => {
    try {
        // Récupérer token dans le header
        const token = req.headers.authorization.split(' ')[1];
        // Vérifier token récupéré
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        // Vérifier id lié au token
        const userId = decodedToken.userId;
        // SI : ID n'est pas valable
        if (req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valable'
        }
        // SINON : ID est valable
        else {
            next();
        }
        // La requête n'est pas authentifiée 
    } catch (error) {
        res.status(401).json({ error });
    }
};