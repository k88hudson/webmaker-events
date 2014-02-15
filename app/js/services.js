// Services -------------------------------------------------------------------

angular.module('myApp.services', ['ngResource'])
  .constant('moment', window.moment)
  .constant('chrono', window.chrono)
  .constant('showdown', window.Showdown)
  .factory('eventService', ['$rootScope', '$resource',
    function ($rootScope, $resource) {
      return $resource('http://localhost:1981' + '/events/:id', null, {
        update: {
          method: 'PUT'
        }
      });
    }
  ])
  .factory('authService', ['$http', '$q', '$rootScope', '$location', '$window',
    function authService($http, $q, $rootScope, $location, $window) {

      var auth = new WebmakerAuthClient({
        host: 'http://localhost:1981',/*$rootScope.config.eventsLocation*/
        handleNewUserUI: false
      });

      // Set up login/logout functions
      $rootScope.login = auth.login;
      $rootScope.logout = auth.logout;

      auth.on('login', function(user) {
        console.log('login', user);
        $rootScope._user = user;
      });

      auth.on('verify', function(user) {
        console.log('verify', user);
        $rootScope._user = user;
      });

      auth.on('logout', function(why) {
        console.log('logout', why);
        delete $rootScope._user;
      });

      auth.on('error', function(message, xhr) {
        console.log('error', message, xhr);
      });

      auth.verify();

      return auth;
    }
  ]);
