//Codi del client per a treballar amb la API.
//Autor: Oriol Villanova Llorens


/**
 * Funció "main" del projecte que es la que s'executa quan es carrega la pàgina.
 */
window.onload = function () {

var url, i, json;
url = document.URL + 'inputs/';
console.log(url);
json = $.getJSON(url,function (data){
    length = Object.keys(data).length;
    console.log(data[2]);
    console.log(length);
    for (i = 0; i < length; i++){
        $('#input').append('<p>Temperatura: ' + data[i]['Temperatura'] + ' Humitat: ' +
            data[i]['Humitat'] + ' El dia:  ' + data[i]['Data'] +' '+ data[i]['Hora'] + '</p>');

    }
    //Implementació del mapa dins de la web.
    openStreetMap();

});

};

document.addEventListener('DOMContentLoaded',function(){
    startLiveUpdate(); //També es pot ficar a la funcio onload
});

/**
 * En toeria aquesta funció treballa de manera dinàmica i hauria de actualitzar les dades ella mateixa
 *
 */
function startLiveUpdate(){
    const temps = 30; //Temps en segons que s'actualitzara la pagina web

    setInterval(function (){
        //Cridar a la funció de la petició de dades
        url = document.URL + 'inputs/';


        //Convertir les dades a un objecte de javascript

        //Processar les dades.


        //renderitzar-les a la pantalla.


    },2000);

};

/**
 * Carrega el mapa i busca els nodes que estan actius
 *
 */
function openStreetMap(){
    //Implementació del mapa:
    var map = L.map('map').setView([41.119, 1.24], 14);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoib3Jpb2x1cnYiLCJhIjoiY2t3b253bm9yMDRucDJ3cDNqbXg2eWNtcSJ9.gWCbds27X0VohTx2hbrH6A'
    }).addTo(map);

    //Coordenades campus sescelades
    var marker = L.marker([41.131587, 1.241852]).addTo(map);
    marker.bindPopup("<b>ACTUA HQ</b><br>Campus sescelades").openPopup();


    //Conseguim els estats
    var urlEstats = document.URL + 'estat';
    json = $.getJSON(urlEstats,function (urlEstats){
        var length, hora;
        length = Object.keys(urlEstats).length;
        console.log(urlEstats[2]);
        console.log(length);
        hora = urlEstats['Hora'];
        console.log(hora)
        var   data = urlEstats['Data']
        var hora_estat = data + ' ' + hora;
        var hora_comparat = new Date(hora_estat);
        var hoy = new Date();
        var transcurso = hoy - hora_comparat; //temps en milisegons
        console.log(transcurso);
        //5 min son 300000 milisegons
        var color
        if (transcurso < 300000){
            color = '#59ff00'
            //El dispositiu està actiu
        }else{
            color = '#ff0000'
            //El dispositiu no està actiu
        }
        //Cercle en un mapa:
        var circle = L.circle([41.119722, 1.260556], {
            color: color,
            fillColor: color,
            fillOpacity: 1,
            radius: 40
        }).addTo(map);
        circle.bindPopup("<b>Rectorat URV</b><br>Tarragona").openPopup();

    });


};

/**
 * Retorna un numero enter entre el minim i el màxim indicat.
 * @param min
 * @param max
 * @returns {*}
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


/**
 * Funció per a consultar la base de dades entrant algun tipus de paràmetre
 */
function consultaBaseDades(){

    // https://luisjordan.net/node-js/conectar-a-base-de-datos-con-node-js/
    // S'han de fer funcions de busqueda
    //TODO
    //

}

