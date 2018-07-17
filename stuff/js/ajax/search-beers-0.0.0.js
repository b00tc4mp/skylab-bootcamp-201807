var beers;
/**
 * @version 0.0.0
 */
function searchBeers(query) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      //console.log(request.responseText);
      beers = JSON.parse(request.responseText);

      console.log('ok! response received!');
    }
  };

  //var url = 'https://www.google.com/search?q=hola+mundo';
  var url = 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=' + query;

  request.open('get', url);

  request.send();
}

