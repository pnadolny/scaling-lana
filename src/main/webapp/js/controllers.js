'use strict';

angular.module('volleyballControllers', []).controller('VolleyballController',
		function($scope, $log, $firebaseArray,$mdDialog,$mdToast) {

			$scope.showSimpleToast = function(message) {
			    $mdToast.show(
			      $mdToast.simple()
			        .content(message)
			        .hideDelay(3000)
			    );
			  };



	$scope.authenticatedDisplayName =null;
	$scope.authenticated =false;
	$scope.authData = null;

  var ref = new Firebase("https://luminous-heat-7529.firebaseio.com/matches");

	ref.onAuth(authDataCallback);
  ref.getAuth();


	$scope.match =  $firebaseArray(ref);

	// Create a callback which logs the current auth state
	function authDataCallback(authData) {
	  if (authData) {
			$scope.authenticated =true;
			$scope.authData = authData;
			if (authData.provider ==='google') {
				$scope.authenticatedDisplayName = authData.google.displayName;
			} else {
				$scope.authenticatedDisplayName = authData.twitter.displayName;
			}
			$scope.showSimpleToast($scope.authenticatedDisplayName + " is logged in via provider " + authData.provider);
	  } else {
			$scope.authenticated =false;
			$scope.authenticatedDisplayName = null;
			$scope.showSimpleToast("You are currently logged out.");
	  }
	}


  $scope.compose = function() {
      $scope.match.$add({
			'homeScore': 0,
			'visitorScore': 0,
			'author': $scope.authenticatedDisplayName,
			'status':'1',
			'date': Date.now(),
			'uid':$scope.authData.uid});
  }

	$scope.count = function(status) {
			var i = 0;
			angular.forEach($scope.match, function(value, key) {
			angular.forEach(value, function(value, key) {
						if (angular.equals(key,'status') && angular.equals(value,status)) {
							 i++;
						}
					});
			});
			return i;
	}

	$scope.delete = function(ev, set) {
			var confirm = $mdDialog.confirm().title('Would you like to delete game?').ok('Do it!').cancel('Cancel').targetEvent(ev);
			$mdDialog.show(confirm).then(function() {
				$scope.match.$remove(set);
				$scope.showSimpleToast('Game deleted');
			}, function() {});
	}

	$scope.signOut = function(){
	 	ref.unauth();

	}


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
