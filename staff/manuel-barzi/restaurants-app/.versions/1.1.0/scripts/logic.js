'use strict';

// my business logic

var logic = {
    find: function(query) {
        var results = restaurants.filter(function (restaurant) {
            return restaurant.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });

        return results;
    }
};