'use strict';

angular
.module("wynikApp",
  ['wynik.config',
   'wynik.routes',
   'wynik.controllers',
   'ngMaterial',
   'firebase']).run( ['$rootScope','FBURL', function($rootScope,FBURL) {
        $rootScope.FBURL = FBURL;
    }]);
