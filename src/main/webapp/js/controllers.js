'use strict';


var volleyballAppControllers = angular.module('volleyballControllers', []);


volleyballAppControllers.controller('VolleyballController',
		function($scope, $log, vibrator, $firebaseArray) {

  var ref = new Firebase("https://luminous-heat-7529.firebaseio.com/sets");
$scope.match =  $firebaseArray(ref);

	// $scope.match = Storage.loadObject('match');
  $scope.hideVisitor = false;
  $scope.vibrate = false;

  $scope.vibrateSupport = vibrator.isSupported();

	$scope.$watch('match',	function(newValue,oldValue) {
				if (vibrator.isSupported() && $scope.vibrate) {
					vibrator.vibrate(100);
				}
				for (var x = 0; x < $scope.match.length; x++) {
					$scope.match.$save($scope.match[x]);
		    }
			},true

	);

    $scope.compose = function() {

	    	var set = {
            'homeScore': 0,
            'visitorScore': 0,
        }

        $scope.match.$add(set);
    }


    $scope.erase = function() {
				$scope.match.$remove(0,$scope.match.length);
    }

    


  });
