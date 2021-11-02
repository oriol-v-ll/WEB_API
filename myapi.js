//Fitxer en javascript utilitzant node JS per programar la API.

var http = require('http');
var express = require('express');
var app = express();
var inputs = require('./data.json');

app.use(express['static'](__dirname ));

// Express route for incoming requests for a customer name
app.get('/inputs/:id', function(req, res) {
res.set('Access-Control-Allow-Origin', '*');
res.status(200).send(inputs[req.params.id]);
});



// Express route for any other unrecognised incoming requests
app.get('*', function(req, res) {
res.status(404).send('Aixo no ho pots demanar, prova una altra cosa!');
});

// Express route to handle errors
app.use(function(err, req, res, next) {
if (req.xhr) {
res.status(500).send('Alguna cosa ha anat malament!');
} else {
next(err);
}
});

app.listen(3000);
console.log('Servidor API en el port 3000');
