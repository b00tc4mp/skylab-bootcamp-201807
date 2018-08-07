'use strict';

describe('logic', function () {
  describe('find', function () {
    var results, resultsTest, results2, resultsTest2;

    beforeEach(function () {
      results = index.find('special', 'name');
      results2 = index.find('iranian', 'cuisine');
      resultsTest = [{id: "40898366", text: "Ashby'S Specialty"}, {
        id: "41042881",
        text: "Special Attention"
      }, {id: "41302769", text: "Enzo'S Pizzeria & Italian Specialties"}, {
        id: "41384605",
        text: "Baldor Specialty Foods"
      }, {id: "41448576", text: "Pyramid Coffee Company Hospital For Special Surgery"}, {
        id: "41450909",
        text: "Torrisi Italian Specialties"
      }, {id: "41482514", text: "Beny'S Delice Gourment Specialities"}, {
        id: "41594110",
        text: "Casale'S Bakery & Specialty Foods"
      }, {id: "41714783", text: "In & Out Special Food"}];
      resultsTest2 = [{id: "40930516", text: "Ravagh Persian Grill"}, {id: "50003218", text: "Ravagh Persian Grill"}];

    });


    it('search for name == "special" results length should be 9', function () {
      expect(results.length).toBe(9);
    });

    it('should return list of all restaurants with "special" in name', function () {
      expect(results).toEqual(resultsTest)
    });

    it('search for cuisine == "iranian" results length should be 2', function () {
      expect(results2.length).toBe(2);
    });

    it('should return list of all restaurants with "iranian" in cuisine', function () {
      expect(results2).toEqual(resultsTest2)
    });
  });

  describe('requestByID', function () {
    var results;
    var resultsTest;

    beforeEach(function () {
      results = index.requestByID("40372831");

      resultsTest = ["<span>Name:</span> Chen'S Chinese", "<span>Address:</span> 1434 Richmond Road, Staten Island, 10304", "<span>Cuisine:</span> Chinese", "<span>Grade:</span> A"];
    });

    it("should return an array of length 4",function() {
      expect(results.length).toBe(4);
    });

    it("should return the correct detail data",function() {
      expect(results).toEqual(resultsTest);
    })


  })

});
