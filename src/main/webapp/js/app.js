'use strict';

// Register modules for the app
angular
.module("volleyballApp", ['volleyballControllers','ngMaterial','firebase','ngRoute'])
.config(function($routeProvider) {
  $routeProvider
   .when('/scoreboard', {
   templateUrl: 'scoreboard.html'
  })
  .otherwise({
      redirectTo: 'index.html'
  });

});
