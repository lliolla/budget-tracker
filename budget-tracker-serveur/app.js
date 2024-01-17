const express = require('express');
const app = express();

const userRoutes = require('./routes/user');

require("dotenv").config();

 // //Connexion à la base de données MongoDB
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI,
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


//app.use(mongoSanitize()); // mongo-sanitize pour prévenir les risques d'injections
//app.use(helmet()); // helmet configure de manière appropriée des en-têtes HTTP, contient 9 fonctions middlewares


//app.use('/images', express.static(path.join(__dirname, 'images'))); // pour que app.js serve le dossier /images 
//app.use('/api/sauces', saucesRoutes);// pour le CRUD des sauces - se refer à ./routes/sauces.js
app.use('/api/v1/auth', userRoutes);// pour l'authentification de l'utilisateur - se refer à ./routes/auth.js

  
app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;