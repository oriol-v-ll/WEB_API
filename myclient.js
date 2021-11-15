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
