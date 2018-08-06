/**
 * @version 0.1.0
 */
function searchBeers(query, callback) {
  var request = new XMLHttpRequest();

  request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status === 200) {
      var beers = JSON.parse(request.responseText);

      callback(beers);
    }
  };

  var url = 'https://quiet-inlet-67115.herokuapp.com/api/search/all?q=' + query;

  request.open('get', url);

  request.send();
}

