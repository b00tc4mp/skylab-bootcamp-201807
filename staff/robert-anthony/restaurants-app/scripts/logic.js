'use strict';

// my business logic


var logic = {

  /*
  find: function (query) {
    var results = restaurants.filter(function (restaurant) {
      return restaurant.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });

    return results;
  },*/
  find: function (term, field) {

    let results;
    if (term && field) {
      results = restaurants.filter(function (element) {
        return element[field].toLowerCase().includes(term.toLowerCase());
      }).map(function (element) {
        return {id: element.restaurant_id, text: element.name}
      });
      return results;
    }
  },
  requestByID: function (id) {
    var restaurantData = restaurants.find(function (element) {
      return (element.restaurant_id) === id;
    });
    var infoToDisplay = [];
    infoToDisplay.push("<span>Name:</span> " + restaurantData.name);
    infoToDisplay.push("<span>Address:</span> " + restaurantData.address.building + " " + restaurantData.address.street + ", " + restaurantData.borough + ", " + "" + restaurantData.address.zipcode);
    infoToDisplay.push("<span>Cuisine:</span> " + restaurantData.cuisine);
    infoToDisplay.push("<span>Grade:</span> " + restaurantData.grades[0].grade);
    return infoToDisplay;

  }
};