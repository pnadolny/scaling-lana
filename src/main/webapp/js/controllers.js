'use strict';

angular.module('volleyballControllers', []).controller('VolleyballController',
		function($scope, $log, $firebaseArray,$mdDialog,$mdToast) {

	$scope.authenticatedDisplayName =null;
	$scope.authenticated =false;

  var ref = new Firebase("https://luminous-heat-7529.firebaseio.com/matches");
	$scope.match =  $firebaseArray(ref);

	$scope.$watch('match',	function(newValue,oldValue) {

				if (angular.isUndefined($scope.match)) {
					return;
				}

				if (!$scope.authenticated) {
					return;
				}
				$log.info(angular.toJson(newValue, true));
				for (var x = 0; x < $scope.match.length; x++) {
					$scope.match.$save($scope.match[x]);
		    }
			},true
	);



  $scope.compose = function() {
      $scope.match.$add({'homeScore': 0,'visitorScore': 0,'author': $scope.userName, 'status':'1', 'date': Date.now()});
  }

	$scope.delete = function(ev, set) {
			var confirm = $mdDialog.confirm().title('Would you like to delete game?').ok('Do it!').cancel('Cancel').targetEvent(ev);
			$mdDialog.show(confirm).then(function() {
				$scope.match.$remove(set);
				$scope.showSimpleToast('Game deleted');
			}, function() {});
	}

		$scope.showSimpleToast = function(message) {
		    $mdToast.show(
		      $mdToast.simple()
		        .content(message)
		        .hideDelay(3000)
		    );
		  };

		$scope.signIn = function(provider){

			$scope.authenticated =false;

			ref.authWithOAuthPopup(provider, function(error, authData) {
  		if (error) {
				$log.info("Login Failed!", error);
  		} else {

				if (provider ==='google') {
					$scope.authenticatedDisplayName = authData.google.displayName;
				} else {
					$scope.authenticatedDisplayName = authData.twitter.displayName;
				}

				$scope.authenticated =true;
				$log.info("Authenticated successfully with payload:", authData);

				$scope.match =  $firebaseArray(ref);

  		}
			});


		}

});
