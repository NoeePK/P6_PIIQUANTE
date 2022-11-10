const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const result = dotenv.config();

// Sécuriser les routes
module.exports = (req, res, next) => {
    try {
        // Récupérer token dans le header
        const token = req.headers.authorization.split(' ')[1];
        // Décoder le token
        const decodedToken = jwt.verify(token, `${process.env.JWT_TOKEN}`);
        // Récupérer l'id dans le token décodé
        const userId = decodedToken.userId;
        // SI : ID est valable
        if (req.body.userId && (req.body.userId === userId)) {
            next();
        }
        // SINON : ID n'est pas valable
        else {
            throw 'User ID non-valide';
        }
        // La requête n'est pas authentifiée 
    } catch (error) {
        res.status(401).json({ error : "La requête n'est pas authentifiée" });
    }
};