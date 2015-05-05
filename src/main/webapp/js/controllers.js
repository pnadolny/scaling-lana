'use strict';

angular.module('volleyballControllers', []).controller('VolleyballController',
		function($scope, $log, $firebaseArray) {

  var ref = new Firebase("https://luminous-heat-7529.firebaseio.com/matches");
  $scope.match =  $firebaseArray(ref);
	$scope.$watch('match',	function(newValue,oldValue) {
				for (var x = 0; x < $scope.match.length; x++) {
					$scope.match.$save($scope.match[x]);
		    }
			},true
	);
  $scope.compose = function() {
      $scope.match.$add({'homeScore': 0,'visitorScore': 0});
  }

});
