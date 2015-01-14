'use strict';


var volleyballApp = angular.module('volleyballApp',[]);

volleyballApp.controller('VolleyballController', ['$scope', '$log', function($scope,$log) {
  
	$scope.currentSet = 0;
	$scope.data = [];
	
	$scope.data.push({'homeScore':0,'visitorScore':0, 'setExcellant':0,'servingAttempt':0});	
    
	$scope.set = $scope.data[$scope.currentSet];	
	
	$scope.resetHome = function(index) {
		var set = $scope.data[index];
		set.homeScore= 0;
		set.homeTimeout =0;
		set.homeSubs = 0;
		set.homeOverlap=0;
		$scope.data[index] = set;
    }
	$scope.resetVisitor = function(index) {
		var set = $scope.data[index];
		set.visitorScore = 0;
		set.visitorSubs =0;
		set.visitorTimeout =0;
		set.visitorOverlap =0;
		$scope.data[index] = set;
    }
	$scope.resetSetter = function(index) {
		var set = $scope.data[index];
		set.setExcellant = 0;
		set.setFault =0;
		set.setKill =0;
		set.setStill =0;
		$scope.data[index] = set;
    }
	$scope.resetServer = function(index) {
		var set = $scope.data[index];
		set.servingAttempt = 0;
		set.servingAce =0;
		set.servingFloat =0;
		set.servingJump =0;
		set.servingFault =0;
		$scope.data[index] = set;
    }
	
	$scope.resetAll = function(index) {
		$scope.resetServer(index);
		$scope.resetSetter(index);
		$scope.resetHome(index);
		$scope.resetVisitor(index);
	}
	
  
	$scope.newMatch = function() {
		$scope.data.push({'homeScore':0,'visitorScore':0});	
    	$log.info('JSON data: ' + angular.toJson($scope.data));
	}
   
     $scope.hideVisitor =false;
	 $scope.hideServing =false;
     $scope.hideSetting =false;
  
   // Setting
	$scope.setExcellant = 0;
    // Number of sets mistakes that result in oppenent score
    $scope.setFault = 0;
    // Number of sets that are not excellent and not faults
    $scope.setStill = 0;
    $scope.setKill = 0;

    
    

	// Blocking
    $scope.blockKill = 0;
    $scope.blockFault = 0;
    $scope.blockRebound = 0;
    $scope.blockAttempt = 0;

	// Digging
	$scope.digExcellent = 0;
	$scope.digFault = 0;
	$scope.digReception = 0;
	$scope.digAttempt = 0;
	
	// Receivers
    $scope.receiveExcellent = 0;
	$scope.receiveFault = 0;
	$scope.receiveAttempt = 0;
	
	
    
	
      
    
    $scope.rotation = 1;
    $scope.pass = 0;
    $scope.set = 0;
    $scope.setMiddle = 0;
    
    $scope.bumpHomeScore = function() {
  		$scope.homeScore = $scope.homeScore + 1;
  	}
  	$scope.bumpVisitorScore = function() {
 		  $scope.visitorScore = $scope.visitorScore +1;
 
  	}
  	
  	
  	$scope.bumpRotation = function() {
  	
		if ($scope.rotation == 6) {
			$scope.rotation = 1;
			return;
		}
		  	
  		$scope.rotation = $scope.rotation +1 ;
  
  	
  	}
  
  
}]);

