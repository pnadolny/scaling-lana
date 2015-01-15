'use strict';


var volleyballAppControllers = angular.module('volleyballControllers',[]);


volleyballAppControllers.controller('VolleyballController', ['$scope', '$log', function($scope,$log) {

	$scope.currentSet = 1;
	$scope.data = [];
	$scope.set = {};
	$scope.hideVisitor =false;
	$scope.hideServing =false;
    $scope.hideSetting =false;
  	$scope.data.push({'homeScore':0,'visitorScore':0, 'setExcellant':0,'servingAttempt':0});	
    $scope.set = $scope.data[$scope.currentSet];	
	
	$scope.nextSet = function() {
		if (angular.isUndefined($scope.data[$scope.currentSet])) {
			$scope.data.push({'homeScore':0,'visitorScore':0, 'setExcellant':0,'servingAttempt':0});	
        }                    
	   $scope.currentSet = $scope.currentSet +1;
	}

	$scope.previousSet = function() {
	   $scope.currentSet = $scope.currentSet -1;
	}
	
	$scope.setSet = function() {
		$scope.set = $scope.data[$scope.currentSet-1];
		$log.info('JSON data: ' + angular.toJson($scope.set));
	}
	$scope.$watch( 'currentSet', $scope.setSet );
	
	
	
	
	$scope.resetHome = function() {
		var set = $scope.data[$scope.currentSet-1];
		set.homeScore= 0;
		set.homeTimeout =0;
		set.homeSubs = 0;
		set.homeOverlap=0;
		
    }
	$scope.resetVisitor = function() {
		var set = $scope.data[$scope.currentSet-1];
		set.visitorScore = 0;
		set.visitorSubs =0;
		set.visitorTimeout =0;
		set.visitorOverlap =0;
    }

	$scope.resetSetter = function() {
		var set = $scope.data[$scope.currentSet-1];
		set.setExcellant = 0;
		set.setFault =0;
		set.setKill =0;
		set.setStill =0;
    }

	$scope.resetServer = function() {
		var set = $scope.data[$scope.currentSet-1];
		set.servingAttempt = 0;
		set.servingAce =0;
		set.servingFloat =0;
		set.servingJump =0;
		set.servingFault =0;
    }
	
	$scope.resetAll = function() {
		$scope.resetServer();
		$scope.resetSetter();
		$scope.resetHome();
		$scope.resetVisitor();
	}
	
  
	
  
}]);




