const passwordValidator = require('password-validator');

const passwordSchema = new passwordValidator();

// Exigences du mot de passe
passwordSchema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(3)
    .has().not().spaces()
    // Blacklist :
    .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = (req, res, next) => {
    // SI : mdp est assez fort
    if (passwordSchema.validate(req.body.password)) {
        next();
    }
    // SINON : mdp n'est pas assez fort
    else {
        return res.status(400).json({ error: "Votre mot de passe doit contenir au minimum : 8 caractères, 1 majuscule, 1 minuscule et 3 nombres" })
    }
}