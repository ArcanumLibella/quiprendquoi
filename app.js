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

// Définition des routes
app.get('/', function (req, res) {
  res.render('index', { title: 'Qui prend quoi ?' });
});

app.post('/party', function (req, res) {
  res.send(axios
    .post(`${process.env.API_URL}/party`, req.body)
    .then(({ data }) => console.log(data))
    .catch((err) => console.error(err)));
});

app.get('/party/:id', function (req, res) {
  res.render('party', { title: 'Évènements' });
});

app.listen(port, () => console.log(`Front app listening on port ${port}!`));