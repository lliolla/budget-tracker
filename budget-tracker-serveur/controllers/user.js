
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
  

const User = require('../models/user');


exports.register = (req, res, next) => {
// on hache le momt de passe
bcrypt.hash(req.body.password,10)
// on recupere le hash et on l'enregistre dans le new user
.then(hash => {
    const user = new User({
        name: req.body.name, 
        email:req.body.email,
        password: hash
    });
    user.save()// on enregistre le user dans la base de donnees
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => {
            if (error.message.includes('unique') && error.message.includes('email')) {
                // La chaîne 'unique' et 'email' indique une violation d'unicité sur le champ email
                return res.status(400).json({ error: 'Cet email existe déjà dans la base de données.' });
              }
            // Gérez d'autres erreurs ici si nécessaire
            console.error(error);
            res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur.' });
          });
})
.catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })// on cherche l'utilisateur qui correspond aux mail ds BD
    // on verif qu'on a un user sinon erreur
    .then(user => {
        if (!user) {
            return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }//on comparer le mot de passe de la requette avec le mp hashe
    bcrypt.compare(req.body.password, user.password)
        .then(valid => {// return true ou false
            if (!valid) {
                return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
