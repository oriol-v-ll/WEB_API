//Codi del client per a treballar amb la API.
//Autor: Oriol Villanova Llorens

window.onload = function () {
var url, i, jqxhr;
//De moment nomes mostrarem les 50 primeres entrades de temperatura
var length = 50;


for (i = 0; i < length ; i++) {
url = document.URL + 'inputs/' + i;
console.log(url);
jqxhr = $.getJSON(url, function(data) {
console.log('API response received');
$('#input').append('<p>Temperatura: ' + data['Temperatura'] + ' Humitat: ' +
data['pin'] + ' El dia:  ' + data['Data'] +' '+ data['Hora'] + '</p>');
});
//length = Object.keys(jqxhr).length;
//console.log(length);
}
};
