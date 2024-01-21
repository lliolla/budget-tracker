const express = require('express');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

// import des routes 
const userRoutes = require('./routes/user');
const transactionRoutes = require('./routes/transactions');
const categoryRoutes = require('./routes/category');
const subcategoryRoutes = require('./routes/subcategory');

 // //Connexion à la base de données MongoDB

mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true,
   useUnifiedTopology: true })
 .then(() => console.log('Connexion à MongoDB réussie !'))
 .catch((error) => {console.log('Connexion à MongoDB échouée !',error)});

  // Eviter les erros CORS afin que tout le monde puisse faire des requêtes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); //accéder à l'API depuis n'importe quelle origine ( '*' )
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');// on donne l'autorisation de utiliser certaines entete
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');// et aussi sur certaines methodes
  next();// j'appelle next() pour passer au middleware d'apres
});
// remplace l'appel a bodyParser qui est déprecié
app.use(express.json());

// utilisation des routes

//app.use(mongoSanitize()); // mongo-sanitize pour prévenir les risques d'injections
//app.use(helmet()); // helmet configure de manière appropriée des en-têtes HTTP, contient 9 fonctions middlewares


//app.use('/images', express.static(path.join(__dirname, 'images'))); // pour que app.js serve le dossier /images 
app.use('/api/v1/auth', userRoutes);// pour l'authentification de l'utilisateur
app.use('/api/v1', transactionRoutes);// pour le crud des transactions
app.use('/api/v1', categoryRoutes);// pour le crud des transactions
app.use('/api/v1', subcategoryRoutes);// pour le crud des transactions

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;