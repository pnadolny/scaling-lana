'use strict';

// Register modules for the app
angular
.module("volleyballApp", ['volleyballControllers','ngMaterial','firebase','ngRoute'])
.config(function($routeProvider) {
  $routeProvider
   .when('/scoreboard', {
   templateUrl: 'templates/scoreboard.html'
  })
  .when('/landing', {
    templateUrl: 'templates/landing.html'
  })
  .otherwise({
      redirectTo: '/landing'
  });

});
