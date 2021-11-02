//Codi del client per a treballar amb la API.

window.onload = function () {
var url, i, jqxhr;
var json, obj;
var length = 2;


for (i = 0; i < length ; i++) {
url = document.URL + 'inputs/' + i;
console.log(url);
jqxhr = $.getJSON(url, function(data) {
console.log('API response received');
$('#input').append('<p>Temperatura: ' + data['Temperatura'] + ' Humitat: ' +
data['pin'] + ' El dia:  ' + data['Data'] +' '+ data['Hora'] + '</p>');
});
length = Object.keys(jqxhr).length;
}
};
