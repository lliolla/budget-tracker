// //Connexion à la base de données MongoDB
const mongoose = require('mongoose');
 mongoose.connect('mongodb+srv://limule38:TestBudget38@cluster0.4rk54y1.mongodb.net/',
   { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));