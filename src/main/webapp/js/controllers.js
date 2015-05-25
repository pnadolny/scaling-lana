'use strict';


// To do...
angular.module('volleyballControllers', []).controller('DetailController',
    function($scope, $log, $firebaseArray, $mdDialog, $mdToast,$mdSidenav,$routeParams) {
    }
);


angular.module('volleyballControllers', []).controller('VolleyballController',
    function($scope, $log, $firebaseArray, $mdDialog, $mdToast,$mdSidenav,$routeParams,$location) {

      // Firebase URL
      var URL = "https://luminous-heat-7529.firebaseio.com/matches";


      var ref = new Firebase(URL);

      $scope.search = $routeParams.search;

      $scope.toggleSidenav = function(menuId) {
            $mdSidenav("left").toggle().then(function(){
                 $log.debug("toggle is done");
           });
      };

        $scope.showSimpleToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                .content(message)
                .hideDelay(3000)
            );
        };


        $scope.statuses = [{'key':'0','description':'Pending'},
        {'key':'1','description':'In Progress'},
        {'key':'2','description':'Final'}];

        $scope.authenticatedDisplayName = null;
        $scope.authenticated = false;
        $scope.authData = null;

        ref.onAuth(authDataCallback);
//        ref.getAuth();

        $scope.isAuthenticated = function() {
             if ($scope.ref.$getAuth()) {
               return true;
             } else {
               return false;
             }
        }


        $scope.match = $firebaseArray(ref);

        // Returns a promise which is resolved when the initial object data has been downloaded from Firebase.
        $scope.match.$loaded().then(function() {
           $log.debug("Firebase data is loaded.");
        }).catch(function(error) {
            $scope.showSimpleToast(error);
        });

        $scope.match.$watch(function(event) {
            $log.debug(event);
        });


        $scope.debug = function() {
          $log.debug(angular.toJson($scope.match));

        }


        // Create a callback which logs the current auth state
        function authDataCallback(authData) {
            if (authData) {
                $scope.authenticated = true;
                $scope.authData = authData;

                switch (authData.provider) {
                    case 'google':
                        $scope.authenticatedDisplayName = authData.google.displayName;
                        break;
                    case 'facebook':
                        $scope.authenticatedDisplayName = authData.facebook.displayName;
                        break;
                    case 'twitter':
                        $scope.authenticatedDisplayName = authData.twitter.displayName;
                        break;
                }
                $scope.showSimpleToast($scope.authenticatedDisplayName + " is logged in via provider " + authData.provider);

                $scope.authenticated = true;
                $scope.match = $firebaseArray(ref);

            } else {
                $scope.authenticated = false;
                $scope.authenticatedDisplayName = null;
                //$scope.showSimpleToast("You are currently logged out.");
            }
        }

        $scope.copy = function(set) {
            set.guid = guid();
            $scope.match.$add(set);
            $scope.showSimpleToast("Game copied!")
        }


        $scope.compose = function() {

          $scope.match.$add({
                'homeScore': 0,
                'visitorScore': 0,
                'author': $scope.authenticatedDisplayName,
                'status': '1',
                'date': Date.now(),
                'guid':guid(),
                'uid': $scope.authData.uid
            }).then(function(ref) {
              $scope.showSimpleToast("New Game created. "+ref.key());
            }).catch(function(error) {
              $scope.showSimpleToast(error);
            })


        }

        $scope.count = function(status) {
            var i = 0;
            angular.forEach($scope.match, function(value, key) {
                angular.forEach(value, function(value, key) {
                    if (angular.equals(key, 'status') && angular.equals(value, status)) {
                        i++;
                    }
                });
            });
            return i;
        }

        $scope.share = function(ev,set) {
          var confirm = $mdDialog.confirm().title($location.absUrl() +'/'+ set.guid).ok('Do it!').cancel('Cancel').targetEvent(ev);
          $mdDialog.show(confirm).then(function() {

          }, function() {});

        }
        $scope.delete = function(ev, set) {
            var confirm = $mdDialog.confirm().title('Would you like to delete game?').ok('Do it!').cancel('Cancel').targetEvent(ev);
            $mdDialog.show(confirm).then(function() {
                $scope.match.$remove(set);
                $scope.showSimpleToast('Game deleted');
            }, function() {});
        }



        $scope.signIn = function(provider) {
            ref.authWithOAuthRedirect(provider,function(error){
              $log.info("Authentication failed", error);
            });
        }
        $scope.signOut = function() {
            $scope.toggleSidenav();
            ref.unauth();
        }
        $scope.showLanding = function() {
          $scope.toggleSidenav();
          $location.path('/landing/').replace();
       }
        $scope.showScoreboard = function() {
          $scope.toggleSidenav();
          $location.path('/scoreboard/').replace();
        }


        // UUID generator
        // Snippet from: http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
         var s4 = function() {
             return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
         };

        var guid = function() {
              return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        };
    });
