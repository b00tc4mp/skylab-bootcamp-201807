var request = new XMLHttpRequest();

var response;

request.onreadystatechange = function () {
  if (request.readyState === 4 && request.status === 200) {
    //console.log(request.responseText);
    response = request.responseText;

    console.log('ok! response received!');
  }
};

//var url = 'https://www.google.com/search?q=hola+mundo';
var url = 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=mahou';

request.open('get', url);

request.send();