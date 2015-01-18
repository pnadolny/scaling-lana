'use strict';


var volleyballAppControllers = angular.module('volleyballControllers',[]);


volleyballAppControllers.controller('VolleyballController', ['$scope', '$log', 'Storage', function($scope,$log,Storage) {

    var defaultSet = {'homeScore':0,'visitorScore':0, 'setExcellant':0,'servingAttempt':0,'passExcellant':0}
	$scope.currentSet = 1;
	
	$scope.data = Storage.loadObject('data');
	
	
	$scope.set = {};
	$scope.hideVisitor =false;
	$scope.hideServing =false;
    $scope.hideSetting =false;
	$scope.hideDefense= false;
	
	$scope.storageSupport = Storage.supported();

	$log.info('Storage supported: ' + Storage.supported());
  	
	if (angular.isUndefined($scope.data[$scope.currentSet])) {
			$log.info('Storage supported...but no data..adding a set');
  		$scope.data.push(defaultSet);	
     }
	
	
	$scope.set = $scope.data[$scope.currentSet];	
	
	$scope.nextSet = function() {
		if (angular.isUndefined($scope.data[$scope.currentSet])) {
			$scope.data.push(defaultSet);	
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
	
	
	
	$scope.save = function() {
		$log.info('Saving to localstorage');
		Storage.saveObject($scope.data,'data');
    }
	
	$scope.$watch(
	        		function () {return $scope.data;},
	             	function(newValue, oldValue) {
						$scope.save();
	        		},true
	       );

	
	$scope.$watch( 'data', $scope.save );
	
	
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

	$scope.resetDefense = function() {
		var set = $scope.data[$scope.currentSet-1];
		set.passExcellant = 0;
		set.passDig =0;
		set.passFault =0;
		set.passPancake =0;
    }

	
	$scope.resetAll = function() {
		Storage.clear();
		for (var i = 0; i < $scope.data.length; i++) {
			$scope.currentSet  = i +1;
			$scope.resetServer();
			$scope.resetSetter();
			$scope.resetVisitor();
			$scope.resetHome();
			$scope.resetDefense();
		 }
		$scope.data.splice(0, $scope.data.length);
		$scope.data.push(defaultSet);	
	    $scope.currentSet  = 1;
	}
}]);




