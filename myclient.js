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
});

var url_estat = document.URL + 'estat/';
json = $.getJSON(url_estat,function (estat){


    //Implementació del mapa dins de la web.
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


    //Implementacio mapa segons estats
    var len =  Object.keys(estat).length;

    for (let i = 0; i<len; i++){
        let hora = estat[i]['Hora'];
        let data = estat[i]['Data'];
        var hora_estat = data + ' ' + hora;
        var hora_comparat = new Date(hora_estat);
        console.log(hora_comparat);
        var hoy = new Date();
        console.log(hoy);
        var transcurso = hoy - hora_comparat ; //temps en milisegons
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
        var circle = L.circle([estat[i]['Lat'], estat[i]['Lon']], {
            color: color,
            fillColor: color,
            fillOpacity: 1,
            radius: 40
        }).addTo(map);
        circle.bindPopup("<b>estat[i]['Nom']</b><br>Tarragona").openPopup();
    }

});

};












