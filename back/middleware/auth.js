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
        req.auth = {
            userId: userId
        };
        next();
    } catch (error) {
        res.status(401).json({ error });
    }
};