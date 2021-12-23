//Fitxer en javascript utilitzant node JS per programar la API.
//Autor: Oriol Villanova Llorens
const Joi = require('joi');
const fs = require('fs');
var http = require('http');
var express = require('express');
var app = express();
app.use(express.json());

//Podem agafar un json agafat que estigui en persistencia de dades, l'ideal es que es vagi actualitzant aquest fitxer.
var inputs = require('./data.json');
var estat = require('./estat.json');


app.use(express['static'](__dirname));

/**
 * Funció per a enviar les dades d'una raspberry pi
 *
 *
 */
app.post('/api/setup', function (req, res) {
    console.log(req.body);

    const estat_ficar =     {
        "Lat": req.body.Lat,
        "Lon": req.body.Lon,
        "Data": req.body.Data,
        "Hora": req.body.Hora,
        "Nom": req.body.Nom
    };

    console.log(estat_ficar);
    let json_guardar = JSON.stringify(estat_ficar);
    fs.writeFileSync('estat.json',json_guardar);
    res.status(200).send("YES!")
});


/**
 * ----------------
 * PETICIONS POST PER DEMOSTRAR QUE EL DISPOSITIU ESTA VIU
 * Aquesta crida ha de ser de record i harà d'actualitzar la dada.
 *-----------------
 */
app.post('/api/up', function (req, res) {
    console.log(req.body);

    const estat_ficar =     {
        "Lat": req.body.Lat,
        "Lon": req.body.Lon,
        "Data": req.body.Data,
        "Hora": req.body.Hora,
        "Nom": req.body.Nom
    };

    // Canviar per una actualització de dades.
    console.log(estat_ficar);
    let json_guardar = JSON.stringify(estat_ficar);
    fs.writeFileSync('estat.json',json_guardar);
    res.status(200).send("YES!")
});


/**
 * ----------------------
 * PETICIONS POST A LA API
 * ----------------------
 */


app.post('/api/enviar', function (req, res) {
    console.log(req.body);
    if (!req.body.Temperatura || req.body.Temperatura > 50){
        //400 Bad request
        res.status(400).send("La temperatura no pot passar els 50 graus!");
        return;
    }
    const dades_raspberry =     {
        "Temperatura": req.body.Temperatura,
        "Humitat": req.body.Humitat,
        "Data": req.body.Data,
        "Hora": req.body.Hora
    };
    inputs.push(dades_raspberry);
    console.log(dades_raspberry);
    let json_guardar = JSON.stringify(inputs);
    fs.writeFileSync('data.json',json_guardar);
    res.status(200).send("YES!")
});

app.post('/api/enviarTot', function (req,res){
    console.log(req.body);
    if (!req.body.full){
        //400 Bad request
        res.status(400).send("Has d'enviar dades!!!");
        return;
    }

    //S'ha de processar la longitud del fitxer

    inputs.push(req.body.full);
    let json_guardar = JSON.stringify(inputs);
    fs.writeFileSync('data.json',json_guardar);
    res.status(200).send("YES!")

});

/**
 * ----------------------
 * PETICIONS GET A LA API
 * ----------------------
 */
//get intputs/:id per a fer una peticio GET d un sol element de la taula
app.get('/inputs/:id', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(inputs[req.params.id]);
    console.log('Dades enviades!');
});
app.get('/inputs', function (req,res){
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(inputs)
    console.log('Dades enviades!');
});
app.get('/estat', function (req,res){
    res.set('Access-Control-Allow-Origin', '*');
    res.status(200).send(estat)
    console.log('Dades enviades!');
});
app.get('*', function (req, res) {
    res.status(404).send('Aixo no ho pots demanar, prova una altra cosa!');
});



/**
 * ----------------------
 * PETICIONS DELETE A LA API
 * ----------------------
 */
// Express route to handle errors
app.use(function (err, req, res, next) {
    if (req.xhr) {
        res.status(500).send('Alguna cosa ha anat malament!');
    } else {
        next(err);
    }
});



// PORT dinamic depenent de la maquina de hosting
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Servidor API en el port ${PORT}`);
