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
        title: data.name
      }),
    )
    .catch((err) => console.log(err));
});

app.listen(port, () => console.log(`Front app listening on port ${port}!`));