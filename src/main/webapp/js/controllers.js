'use strict';

angular.module('wynik.controllers', []).controller('WynikController',
    function($rootScope,$scope, $log, $firebaseArray, $mdDialog, $mdToast,$mdSidenav,$routeParams,$location) {

      var ref = new Firebase($rootScope.FBURL);

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


        $scope.games = $firebaseArray(ref);

        // Returns a promise which is resolved when the initial object data has been downloaded from Firebase.
        $scope.games.$loaded().then(function() {
           $log.debug("Firebase data is loaded.");
        }).catch(function(error) {
            $scope.showSimpleToast(error);
        });

        $scope.games.$watch(function(event) {
            $log.debug(event);
        });


        $scope.debug = function() {
          $log.debug(angular.toJson($scope.games));

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
                $scope.games = $firebaseArray(ref);

            } else {
                $scope.authenticated = false;
                $scope.authenticatedDisplayName = null;
                //$scope.showSimpleToast("You are currently logged out.");
            }
        }

        $scope.copy = function(game) {
            var copy = angular.copy(game);
            copy.guid = guid();
            copy.homeScore = 0;
            copy.visitorScore = 0;
            $scope.games.$add(copy);
            $scope.showSimpleToast("Game copied!")
        }


        $scope.compose = function() {

          $scope.games.$add({
                'homeScore': 0,
                'visitorScore': 0,
                'author': $scope.authenticatedDisplayName,
                'status': 'Pending',
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
            angular.forEach($scope.games, function(value, key) {
                angular.forEach(value, function(value, key) {
                    if (angular.equals(key, 'status') && angular.equals(value, status)) {
                        i++;
                    }
                });
            });
            return i;
        }


        $scope.share = function(ev,game) {
            $mdDialog.show({
                controller: ShareController,
                templateUrl: 'partials/share.html',
                targetEvent: ev,
                locals: {
                    link: $location.absUrl() +'/search/'+game.guid
                }
            }).then(function(answer) {}, function() {});
        }

        $scope.delete = function(ev, game) {
            var confirm = $mdDialog.confirm().title('Would you like to delete game?').ok('Do it!').cancel('Cancel').targetEvent(ev);
            $mdDialog.show(confirm).then(function() {
                $scope.games.$remove(game);
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



            function ShareController($scope, $mdDialog, $log, link) {
                $scope.link=link;
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }

    });
