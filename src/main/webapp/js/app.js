'use strict';

// Register modules for the app
angular
.module("volleyballApp", ['volleyballControllers','ngMaterial','firebase','ngRoute'])
.config(function($routeProvider) {
  $routeProvider
   .when('/scoreboard', {
   templateUrl: 'templates/scoreboard.html'
  })
  .when('/scoreboard/search/:search', {
  templateUrl: 'templates/scoreboard.html',
  controller:'VolleyballController'
  })
  .when('/landing', {
    templateUrl: 'templates/landing.html'
  })
  .otherwise({
      redirectTo: '/landing'
  });

});
