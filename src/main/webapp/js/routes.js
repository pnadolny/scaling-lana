"use strict";

angular.module('wynik.routes', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {

  $routeProvider.when('/scoreboard', {
   templateUrl: 'partials/scoreboard.html'
  })
  $routeProvider.when('/follow', {
   templateUrl: 'partials/follow.html'
  })
  $routeProvider.when('/scoreboard/search/:search', {
    templateUrl: 'partials/scoreboard.html',
    controller:'WynikController'
  })
  $routeProvider.when('/home', {
    templateUrl: 'partials/home.html'
  })
  $routeProvider.otherwise({
      redirectTo: '/scoreboard'
  });
}]);
