const mongoose = require('mongoose');
const dotenv = require('dotenv');
const result = dotenv.config();

// Connexion à la base de données
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB : OK'))
    .catch(() => console.log('Connexion à MongoDB : FAIL'))

module.exports = mongoose;