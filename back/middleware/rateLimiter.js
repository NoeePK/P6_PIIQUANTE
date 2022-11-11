const rateLimiter = require('express-rate-limit');

// Limiter les tentatives de connexion
const rateLimit = rateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    message: "Vous avez atteint la limite de tentatives de connexion autorisée."
})

module.exports = rateLimit;