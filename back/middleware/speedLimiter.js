const slowDown = require('express-slow-down');

// Limiter le spam de création de sauces
const speedLimit = slowDown({
    windowMs: 15 * 60 * 1000,
    delayAfter: 10,
    delayMs: 800,
})

// Session : 15 minutes
// Limite : 10 post
// Delais : 800 ms 

module.exports = speedLimit;