const express = require('express');
const app = express();

 //Connexion à la base de données MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://limule38:TestBudget38@cluster0.4rk54y1.mongodb.net/',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  // Eviter les erros CORS afin que tout le monde puisse faire des requêtes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à l'API depuis n'importe quelle origine ( '*' )
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');// on donne l'autorisation de utiliser certaines entete
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');// et aussi sur certaines methodes
  next();// j'appelle next() pour passer au middleware d'apres
});
// remplace l'appel a bodyParser qui est déprecié
app.use(express.json());

  
app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;