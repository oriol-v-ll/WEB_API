//Fitxer en javascript utilitzant node JS per programar la API.
//Autor: Oriol Villanova Llorens
const Joi = require('joi');
const fs = require('fs');
const Cryptr = require('cryptr');
var http = require('http');
var express = require('express');
var crypto = require('crypto');
var assert = require('assert');
const {spawn} = require('child_process');
var app = express();
app.use(express.json());

//Podem agafar un json agafat que estigui en persistencia de dades, l'ideal es que es vagi actualitzant aquest fitxer.
var inputs = require('./data.json');
var estat = require('./estat.json');



var password = 'TFG1234567891234';


app.use(express['static'](__dirname));

var nodev = process.version.match(/^v(\d+)\.(\d+)/);
function decrypt (key,value) {
    aes.setAutoPadding(false);
    // Convert urlsafe base64 to normal base64
    var value = value.replace(/\-/g, '+').replace(/_/g, '/');

    // Convert from base64 to binary string
    var edata = new Buffer.from(value, 'base64').toString('binary')

    // Create key from key
    var m = crypto.createHash('md5').update(key)
    var key = m.digest('hex');

    m = crypto.createHash('md5').update(key + key)
    var iv = m.digest('hex').slice(0,16);

    try{
        var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
        decipher.setAutoPadding(false);

        var decrypted = decipher.update(edata, 'binary') + decipher.final('binary');
        var textval = new Buffer.from(decrypted, 'binary').toString('utf8');


        return textval.slice(16)
    }

    catch (err){console.log('DECRYPT ERROR:',err.code,)}

};


app.use(express.json({extended: false})); //This is the line that you want to add
app.post('/api/setup/encriptat', function (req, res) {
    console.log("AQUI")
    console.log(req.body.ESTAT);
    //cridem al python per a que faci les funcions necessaries

    const pythonProcess = spawn('python3',['nodePythonApp/decrypt.py']);
    let pythonResponse = ""
    pythonProcess.stdin.write(req.body.ESTAT)
    pythonProcess.stdin.end()
    pythonProcess.stdout.on('data', function(data) {
        console.log("ARRIBA AQUI EL PYTHON")
        pythonResponse += data.toString()
    })
    pythonProcess.stdout.on('end', function() {
        console.log(pythonResponse)
        estat.push(JSON.parse(pythonResponse));
        let json_guardar = JSON.stringify(estat);
        fs.writeFileSync('estat.json',json_guardar);
    })
    res.status(200).send("YES!")
});

app.post('/api/setup', function (req, res) {
    console.log(req.body);

    const estat_ficar =     {
        "Lat": req.body.Lat,
        "Lon": req.body.Lon,
        "Data": req.body.Data,
        "Hora": req.body.Hora,
        "Nom": req.body.Nom
    };
    estat.push(estat_ficar);
    console.log(estat_ficar);
    let json_guardar = JSON.stringify(estat);
    fs.writeFileSync('estat.json',json_guardar);
    res.status(200).send("YES!")
});


/**
 *
 * Endpoint per enviar els batecs i anar actualitzant el json dels estats
 */
app.post('/api/up', function (req, res) {
    console.log(req.body);
    'use strict';
    const fs = require('fs');
    let rawdata = fs.readFileSync('estat.json');
    let estat = JSON.parse(rawdata);
    console.log(estat);

       let len = Object.keys(estat).length
         const nom =    req.body.Nom
         for (let i = 0; i<len ; i++){
             if (estat[i]['Nom']==nom){
                 estat[i]['Hora']=req.body.Hora;
                 estat[i]['Data']=req.body.Data;
             }
         }

        let json_guardar = JSON.stringify(estat);
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

/**
 * Funcions necessaries per encriptar i desencriptar elements
 *
 */


var encrypt = function (input, password, callback) {
    var m = crypto.createHash('md5');
    m.update(password)
    var key = m.digest('hex');

    m = crypto.createHash('md5');
    m.update(password + key)
    var iv = m.digest('hex');

    var data = new Buffer(input, 'utf8').toString('binary');

    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv.slice(0,16));

    // UPDATE: crypto changed in v0.10
    // https://github.com/joyent/node/wiki/Api-changes-between-v0.8-and-v0.10
    var nodev = process.version.match(/^v(\d+)\.(\d+)/);
    var encrypted;

    if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {
        encrypted = cipher.update(data, 'binary') + cipher.final('binary');
    } else {
        encrypted = cipher.update(data, 'utf8', 'binary') + cipher.final('binary');
    }

    var encoded = new Buffer(encrypted, 'binary').toString('base64');

    callback(encoded);
};

var decrypt = function (input, password, callback) {
    // Convert urlsafe base64 to normal base64
    var input = input.replace(/\-/g, '+').replace(/_/g, '/');
    // Convert from base64 to binary string
    var edata = new Buffer(input, 'base64').toString('binary')

    // Create key from password
    var m = crypto.createHash('md5');
    m.update(password)
    var key = m.digest('hex');

    // Create iv from password and key
    m = crypto.createHash('md5');
    m.update(password + key)
    var iv = m.digest('hex');

    // Decipher encrypted data
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv.slice(0,16));

    // UPDATE: crypto changed in v0.10
    // https://github.com/joyent/node/wiki/Api-changes-between-v0.8-and-v0.10
    var nodev = process.version.match(/^v(\d+)\.(\d+)/);
    var decrypted, plaintext;

    if( nodev[1] === '0' && parseInt(nodev[2]) < 10) {
        decrypted = decipher.update(edata, 'binary') + decipher.final('binary');
        plaintext = new Buffer(decrypted, 'binary').toString('utf8');
    } else {
        plaintext = (decipher.update(edata, 'binary', 'utf8') + decipher.final('utf8'));
    }

    callback(plaintext);
};


// PORT dinamic depenent de la maquina de hosting
const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.log(`Servidor API en el port ${PORT}`);
