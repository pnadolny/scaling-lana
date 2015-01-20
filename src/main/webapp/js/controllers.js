'use strict';


var volleyballAppControllers = angular.module('volleyballControllers', []);


volleyballAppControllers.controller('VolleyballController', ['$scope', '$log', 'Storage', function($scope, $log, Storage) {

    $scope.hideVisitor = false;
    $scope.hideServing = false;
    $scope.hideSetting = false;
    $scope.hideDefense = false;
    $scope.hideOutside = false;
    $scope.hideRightside = false;
	
    var defaultSet = {
        'homeScore': 0,
        'visitorScore': 0,
        'setExcellant': 0,
        'servingAttempt': 0,
        'passExcellant': 0,
        'osExcellant': 0,
        'rsExcellant': 0
    }
	 
	$scope.match = [];
	
	$scope.currentSet = 0;
	
	
	//Storage.loadObject('data');

    $scope.storageSupport = Storage.supported();

    $log.info('Storage supported: ' + Storage.supported());
	
	$scope.compose = function() {
	
		var set = {
			'homeScore': 0,
			'visitorScore': 0,
			'setExcellant': 0,
			'servingAttempt': 0,
			'passExcellant': 0,
			'osExcellant': 0,
			'rsExcellant': 0
		}
	
		$scope.match.push(set);
	}
	$scope.size = function() {
		return $scope.match.length;
	}
	
	
	$scope.$watch('currentSet',
		function(newValue,oldValue) {
			$log.info('Watch occurred');
			if (angular.isUndefined($scope.match[newValue])) {
					$scope.compose();
			
			}
		
			
		}	);
	
    $scope.save = function() {
        $log.info('Saving to localstorage');
        Storage.saveObject($scope.match, 'data');
    }
    $scope.erase = function() {
        Storage.clear();
		$scope.resetAll();
    }

    $scope.resetHome = function() {
        var set = $scope.match[$scope.currentSet - 1];
        set.homeScore = 0;
        set.homeTimeout = 0;
        set.homeSubs = 0;
        set.homeOverlap = 0;

    }
    $scope.resetVisitor = function() {
        var set = $scope.match[$scope.currentSet - 1];
        set.visitorScore = 0;
        set.visitorSubs = 0;
        set.visitorTimeout = 0;
        set.visitorOverlap = 0;
    }

    $scope.resetSetter = function() {
        var set = $scope.match[$scope.currentSet - 1];
        set.setExcellant = 0;
        set.setFault = 0;
        set.setKill = 0;
        set.setStill = 0;
    }

    $scope.resetServer = function() {
        var set = $scope.match[$scope.currentSet - 1];
        set.servingAttempt = 0;
        set.servingAce = 0;
        set.servingFloat = 0;
        set.servingJump = 0;
        set.servingFault = 0;
    }

    $scope.resetDefense = function() {
        var set = $scope.match[$scope.currentSet - 1];
        set.passExcellant = 0;
        set.passDig = 0;
        set.passFault = 0;
        set.passPancake = 0;
    }

    $scope.resetOutside = function() {
        var set = $scope.match[$scope.currentSet - 1];
        set.osExcellant = 0;
        set.osSpike = 0;
        set.osFault = 0;

    }

    $scope.resetRightside = function() {
        var set = $scope.match[$scope.currentSet - 1];
        set.rsExcellant = 0;
        set.rsSpike = 0;
        set.rsFault = 0;

    }

    $scope.resetAll = function() {
        $scope.resetServer();
        $scope.resetSetter();
        $scope.resetVisitor();
        $scope.resetHome();
        $scope.resetOutside();
        $scope.resetRightside();
        $scope.resetDefense();
        $scope.match.splice(0, $scope.match.length);
        $scope.match.push(defaultSet);
        $scope.currentSet = 1;
    }
}]);