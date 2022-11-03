const rateLimiter = require('express-rate-limit');
const slowDown = require('express-slow-down');

// Limiter tentative de connexion
const rateLimit = rateLimiter({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: "Vous avez atteint la limite de tentatives de connexion autorisée."
})

// Limiter création de sauces
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 10,
    delayMs: 500,
})

module.exports = { rateLimit }
module.exports = { speedLimiter }