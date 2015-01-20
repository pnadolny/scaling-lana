'use strict';

var volleyballAppFilters = angular.module('volleyballFilters', []);

volleyballAppFilters.filter('offset', function() {
    return function(input, start) {
		start = +start; //parse to int
        return input.slice(start);
    }
});
