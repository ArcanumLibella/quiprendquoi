const express = require('express');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT;

// Pour utiliser pug
app.set('view engine', 'pug');

// Pour récupérer les paramètres du formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Pour servir tout le dossier public de façon statique
app.use(express.static('public'));

/*
 Définition des routes 
*/
// Page d'accueil
app.get('/', function (req, res) {
  res.render('index', { title: 'Qui prend quoi ?' });
});

// Rediriger le POST vers la page événement
app.post('/party', function (req, res) {
  axios
    .post(`${process.env.API_URL}/party`, req.body)
    .then(({ data }) => res.redirect(`/party/${data._id}`))
    .catch((err) => res.send(err));
});

// Page d'évènement
app.get('/party/:id', function (req, res) {
  // console.log('ID de l\'event : ', req.params.id)
  axios
    .get(`${process.env.API_URL}/party/${req.params.id}`)
    .then(({ data }) =>
      res.render('party', {
        party: data,
        title: data.name,
        url: `${process.env.FRONT_URL}:${port}/party/${data._id}`
      }),
    )
    .catch((err) => console.log(err));
});

// Rediriger le POST vers la page événement après l'ajout d'un produit
app.post('/party/:id/items', function (req, res) {
  // console.log('item : ', req.body);
  axios
    .post(`${process.env.API_URL}/party/${req.params.id}/items`, req.body)
    // .then(({ data }) => console.log(data))
    // .then(({ data }) => console.log("items -> ", party.items))
    .then(({ data }) => res.redirect(`/party/${req.params.id}`))
    .catch((err) => res.send(err));
});

app.listen(port, () => console.log(`Front app listening on port ${port}!`));