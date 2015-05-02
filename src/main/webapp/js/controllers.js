

var volleyballAppControllers = angular.module('volleyballControllers', []);


volleyballAppControllers.controller('VolleyballController', function($scope, $log, vibrator, $firebaseArray,$firebaseObject) {


	var refRoot = new Firebase("https://luminous-heat-7529.firebaseio.com/currentSet");
	var ref = new Firebase("https://luminous-heat-7529.firebaseio.com/sets");

	var syncObject = $firebaseObject(refRoot);

	syncObject.$bindTo($scope, "currentSet");


	$scope.match =  $firebaseArray(ref);

	// $scope.match = Storage.loadObject('match');
  $scope.hideVisitor = false;
  $scope.hideServing = false;
  $scope.hideSetting = false;
  $scope.hideDefense = false;
  $scope.hideOutside = false;
  $scope.hideRightside = false;
	$scope.hideMiddle = false;
  $scope.vibrate = false;

  $scope.vibrateSupport = vibrator.isSupported();

	$scope.$watch('match',	function(newValue,oldValue) {
				if (vibrator.isSupported() && $scope.vibrate) {
					vibrator.vibrate(100);
				}

	//			$scope.match.$save($scope.match[$scope.currentSet.currentSet]);

			},true

	);

    $scope.compose = function() {

			$scope.currentSet = $scope.currentSet || 0;

		    var set = {
            'homeScore': 0,
            'visitorScore': 0,
            'setExcellant': 0,
            'servingAttempt': 0,
            'passExcellant': 0,
            'osExcellant': 0,
            'rsExcellant': 0,
			      'middleExcellant': 0
        }

        $scope.match.$add(set);
    }

    $scope.next = function() {

    //    if (angular.isUndefined($scope.currentSet)) {
    //           $scope.compose();
    //     }
	 			$scope.currentSet.currentSet =($scope.currentSet.currentSet || 0) +1;
    }

    $scope.erase = function() {

				$scope.match.$remove(0,$scope.match.length);
				//$scope.match.splice(0, $scope.match.length);
				$scope.compose();
        $scope.match.currentSet =0;

    }

    $scope.resetHome = function() {
        var set = $scope.match[$scope.match.currentSet];
        set.homeScore = 0;
        set.homeTimeout = 0;
        set.homeSubs = 0;
        set.homeOverlap = 0;

    }
    $scope.resetVisitor = function() {
        var set = $scope.match[$scope.match.currentSet];
        set.visitorScore = 0;
        set.visitorSubs = 0;
        set.visitorTimeout = 0;
        set.visitorOverlap = 0;
    }

    $scope.resetSetter = function() {
        var set = $scope.match[$scope.match.currentSet];
        set.setExcellant = 0;
        set.setFault = 0;
        set.setKill = 0;
        set.setStill = 0;
    }

    $scope.resetServer = function() {
        var set = $scope.match[$scope.match.currentSet];
        set.servingAttempt = 0;
        set.servingAce = 0;
        set.servingFloat = 0;
        set.servingJump = 0;
        set.servingFault = 0;
    }

    $scope.resetDefense = function() {
        var set = $scope.match[$scope.match.currentSet];
        set.passExcellant = 0;
        set.passDig = 0;
        set.passFault = 0;
        set.passPancake = 0;
    }

    $scope.resetOutside = function() {
        var set = $scope.match[$scope.match.currentSet];
        set.osExcellant = 0;
        set.osSpike = 0;
        set.osFault = 0;

    }

    $scope.resetMiddle = function() {
        var set = $scope.match[$scope.match.currentSet];
        set.middleExcellant = 0;
        set.middleSpike = 0;
        set.middleFault = 0;
		set.middleBlock = 0;
    }


    $scope.resetRightside = function() {
        var set = $scope.match[$scope.match.currentSet];
        set.rsExcellant = 0;
        set.rsSpike = 0;
        set.rsFault = 0;

    }




    $scope.resetSet = function() {
	$scope.resetServer();
        $scope.resetSetter();
        $scope.resetVisitor();
        $scope.resetHome();
        $scope.resetOutside();
        $scope.resetRightside();
        $scope.resetDefense();
    }

});
