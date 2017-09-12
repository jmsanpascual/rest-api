(function() {
    'use strict';

    angular
        .module('user', ['ui.router'])
        .factory('User', UserFactory);

    UserFactory.$inject = ['$http'];

    /* @ngInject */
    function UserFactory($http) {
        var User = {};

        User.all = function () {
            return $http.get('../person').then(function (response) {
                return response.data;
            });
        };

        User.save = function (data) {
            return $http.post('../person', data).then(function (response) {
                return response.data;
            });
        };

        User.update = function (user) {
            return $http.put('../person/' + user.id, user).then(function (response) {
                return response.data;
            });
        };

        User.get = function (id) {
            return $http.get('../person/' + id).then(function (response) {
                return response.data;
            });
        };

        User.delete = function (id) {
            return $http.delete('../person/' + id).then(function (response) {
                return response.data;
            });
        };

        return User;
    }
})();
