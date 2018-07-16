'use strict';

// my business logic

var logic = {
    find: function(query) {
        var results = restaurants.filter(function (restaurant) {
            return restaurant.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
        });

        return results;
    },

    getById: function(id) {
        var restaurant = restaurants.find(function (restaurant) {
            return restaurant.restaurant_id === id;
        });

        return restaurant;
    }
};