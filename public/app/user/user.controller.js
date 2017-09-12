(function() {
    'use strict';

    angular
        .module('user')
        .controller('UserController', UserController)
        .config(function ($stateProvider) {
            $stateProvider.state('user', {
                url: '/user',
                templateUrl: 'app/user/user.html',
                controller: 'UserController as uc'
            });
        });

    UserController.$inject = ['User'];

    /* @ngInject */
    function UserController(User) {
        var vm = this;
        vm.user = {
            pokemon: { name: '' }
        };

        vm.$onInit = function () {
            User.all().then(function (users) {
                vm.users = users;
            });
        };

        vm.addUser = function (user) {
            if (!user) return;

            User.save(user).then(function (response) {
                user.id = response.id;
                vm.users.push(user);
                vm.user = {
                    pokemon: { name: '' }
                };
            });
        };

        vm.deleteUser = function (id, index) {
            User.delete(id).then(function () {
                vm.users.splice(index, 1);
            });
        };
    }
})();
