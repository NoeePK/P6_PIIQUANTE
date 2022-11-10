const slowDown = require('express-slow-down');

// Limiter le spam de création de sauces
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 10,
    delayMs: 500,
})

module.exports = { speedLimiter }