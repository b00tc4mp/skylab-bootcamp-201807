'use strict';

var API_DOMAIN = 'https://quiet-inlet-67115.herokuapp.com/api';

var logic = {

    find: function(query) {
        
        var request = new XMLHttpRequest(),
            method = 'get',
            url = API_DOMAIN + '/search/all?q=' + query;

        request.open(method, url);
        request.onreadystatechange = function() {

            if (request.readyState === 4 && request.status === 200) {
                //console.log(request.responseText);
                beers = JSON.parse(request.responseText);

                console.log('ok! response received!');
            }
        };
        request.send();
    }
};


logic.find('mahou');