'use strict';

var results = logic.find('cream');

assert('should results length be 104', results.length === 104);

for (var i = 0; i < results.length; i++)
    assert('should each result name have word cream', results[i].name.toLowerCase().indexOf('cream') > -1);