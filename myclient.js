//Codi del client per a treballar amb la API.
//Autor: Oriol Villanova Llorens

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
console.log(json);
};

document.addEventListener('DOMContentLoaded',function(){
    startLiveUpdate(); //També es pot ficar a la funcio onload
});

//Funció per actualitzar a temps real les dades que envia el sensor. S'ha de millorar fent que la API demani a ell
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

    var color = '#59ff00'
    var i = getRandomInt(1, 3)
    console.log(i)
    if (i==1){
        color = '#59ff00'
    }else{
        color = '#ff0000'
    }
    //Cercle en un mapa:
    var circle = L.circle([41.119722, 1.260556], {
        color: color,
        fillColor: color, //#f03
        fillOpacity: 1,
        radius: 40
    }).addTo(map);
    circle.bindPopup("<b>Rectorat URV</b><br>Tarragona").openPopup();
};


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}