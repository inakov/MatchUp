'use strict';

/**
 * @ngdoc overview
 * @name matchupApp
 * @description
 * # matchupApp
 *
 * Main module of the application.
 */
angular
.module('matchupApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'config',
    'ui.bootstrap'
])
.factory('authHttpResponseInterceptor', function($q, $location, $injector){
    function redirectToLogin() {
        var authManager = $injector.get('authManager');
        authManager.logoutUser();
        var state = $injector.get('$state'); //This is needed because some bug with circular dependency of $state
        state.go('login');
    }

    return {
        response: function(response){
            if (response.status === 401) {
                response.data = {code:'BAD_CREDENTIALS', reason:response.data};
                redirectToLogin();
                return response;
            }
            if (response.status >= 500) {
                console.error(response.status, response);
            }

            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                redirectToLogin();
            }
            if (rejection.status === 500) {
                $location.path('/500');
            }
            return $q.reject(rejection);
        }
    };
})
.config(function ($routeProvider) {
    var isUserLogged = ['authManager', function(authManager) {
        return authManager.getIsUserLogged();
    }];

    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
    })
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
    })
    .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
    })
    .when('/create-team', {
        templateUrl: 'views/create-team.html',
        controller: 'GameCtrl'
    })
    .when('/my-teams', {
        templateUrl: 'views/my-teams.html',
        controller: 'TeamCtrl'
    })
    .when('/team/:id', {
        templateUrl: 'views/team.html',
        controller: 'TeamCtrl'
    })
    .when('/create-game', {
        templateUrl: 'views/create-game.html',
        controller: 'GameCtrl'
    })
    .when('/game/:id', {
        templateUrl: 'views/game.html',
        controller: 'GameCtrl'
    })
    .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
});
