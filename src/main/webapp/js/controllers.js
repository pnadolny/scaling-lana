'use strict';

angular.module('volleyballControllers', []).controller('VolleyballController',
		function($scope, $log, $firebaseArray,$mdDialog) {

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

	$scope.delete = function(ev, set) {
			var confirm = $mdDialog.confirm().title('Would you like to delete game?').ok('Do it!').cancel('Cancel').targetEvent(ev);
			$mdDialog.show(confirm).then(function() {
				$scope.match.$remove(set);
			}, function() {});
	}


});
