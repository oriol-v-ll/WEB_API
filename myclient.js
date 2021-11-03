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
