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

//Funció per actualitzar a temps real les dades que envia el sensor. S'ha de millorar fent que la API demani a ell
function startLiveUpdate(){
    const temps = 30; //Temps en segons que s'actualitzara la pagina web

    setInterval(function (){
        //Peticio a la api per a noves comandes.
    },2000);

};
