'use strict';

angular.module('wynik.controllers', []).controller('WynikController',
    function($rootScope, $scope, $log, $firebaseArray, $mdDialog, $mdToast, $mdSidenav, $routeParams, $location) {

        $scope.predicate = 'date';
        $scope.reverse = true;
        $scope.authenticated = false;
        $scope.authData = null;
        $scope.followGame = null;
        $scope.search = $routeParams.search;

        var config = {
            apiKey: "AIzaSyA1NdrMhxtBy-RPfIzcUa8EoiQCFGndb0o",
            authDomain: "luminous-heat-7529.firebaseapp.com",
            databaseURL: "https://luminous-heat-7529.firebaseio.com",
            projectId: "luminous-heat-7529",
            storageBucket: "luminous-heat-7529.appspot.com",
            messagingSenderId: "473193502312"
        };


        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log(user);
                $scope.authData = user;
                $scope.authenticated = true;


                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var phoneNumber = user.phoneNumber;
                var providerData = user.providerData;

                user.getIdToken().then(function(accessToken) {
                    $scope.accountDetails = JSON.stringify({
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        phoneNumber: phoneNumber,
                        photoURL: photoURL,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }, null, '  ');
                });
            } else {
                $scope.authenticated = false;
            }
        });


        var ref = firebase.database().ref('games');
        $scope.games = $firebaseArray(ref);


        $scope.order = function(reverse) {
            $scope.reverse = reverse;
        };


        $scope.signInFB = function() {

            var ui = new firebaseui.auth.AuthUI(firebase.auth());

            ui.start('#firebaseui-auth-container', {
                callbacks: {
                    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                        return true;
                    }
                },
                signInFlow: 'popup',
                signInSuccessUrl: '#!/scoreboard',
                signInOptions: [
                    {
                        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
                        requireDisplayName: false
                    }
                ]
            });

        };



        $scope.toggleSidenav = function(menuId) {
            $mdSidenav("left").toggle().then(function() {
                $log.debug("toggle is done");
            });
        };

        $scope.openMenu = function($mdOpenMenu, ev) {
            $mdOpenMenu(ev);
        };

        $scope.showSimpleToast = function(message) {
            $mdToast.show(
                $mdToast.simple()
                .content(message)
                .hideDelay(5000)
            );
        };


        $scope.statuses = [{
            'key': '0',
            'description': 'Pending'
        }, {
            'key': '1',
            'description': 'In Progress'
        }, {
            'key': '2',
            'description': 'Final'
        }];



        $scope.debug = function() {
            $log.debug(angular.toJson($scope.games));

        }


        $scope.copy = function(game) {
            var copy = angular.copy(game);
            copy.guid = guid();
            copy.homeScore = 0;
            copy.visitorScore = 0;
            copy.status = 'Pending';
            $scope.games.$add(copy);
            $scope.showSimpleToast("Game copied!")
        }


        $scope.compose = function() {

            $scope.games.$add({
                'homeScore': 0,
                'visitorScore': 0,
                'author': $scope.authData.displayName,
                'status': 'Pending',
                'date': Date.now(),
                'guid': guid(),
                'uid': $scope.authData.uid
            }).then(function(ref) {
                $scope.showSimpleToast("New Game created.");
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


        $scope.share = function(ev, game) {

            var confirm = $mdDialog.prompt()
               .title('Share this following link with your friends.        ')
                .textContent('Share the link!')
                .placeholder('Link')
                .ariaLabel('Link')
                .initialValue($location.absUrl() + '/search/' + game.guid)
                .targetEvent(ev)
                .ok('Okay!');


            $mdDialog.show(confirm).then(function(result) {

            }, function() {

            });

        }

        $scope.delete = function(ev, game) {
            var confirm = $mdDialog.confirm().title('Would you like to delete game?').ok('Do it!').cancel('Cancel').targetEvent(ev);
            $mdDialog.show(confirm).then(function() {
                $scope.games.$remove(game);
                $scope.showSimpleToast('Game deleted');
            }, function() {});
        }




        $scope.signOut = function() {
            $scope.toggleSidenav();
            ref.unauth();
        }
        $scope.showHome = function() {
            $scope.toggleSidenav();
            $location.path('/home/').replace();
        }
        $scope.showFollow = function(game) {
            $scope.toggleSidenav();
            $scope.followGame = game;

            $location.path('/follow/').replace();
        }

        $scope.showScoreboard = function() {
            $scope.toggleSidenav();
            $location.path('/scoreboard/').replace();
        }


        $scope.follow = function(game) {
            $location.path('/scoreboard/search/' + game.guid).replace();
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
            $scope.link = link;
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
