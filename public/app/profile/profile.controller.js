(function() {
    'use strict';

    angular
        .module('profile', ['ui.router'])
        .controller('ProfileController', ProfileController)
        .config(function ($stateProvider) {
            $stateProvider.state('profile', {
                url: '/user/:id',
                templateUrl: 'app/profile/profile.html',
                controller: 'ProfileController as pc',
                resolve: {
                    // Add resolvedUser with a call to Users using $stateParams
                    resolvedUser: function(User, $stateParams) {
                        return User.get($stateParams.id);
                    }
                }
            });
        });

    ProfileController.$inject = ['resolvedUser', 'Pokemon', '$state'];

    /* @ngInject */
    function ProfileController(resolvedUser, Pokemon, $state) {
        var vm = this;

        if (resolvedUser) {
            vm.user = resolvedUser;
        } else {
            return $state.go('404');
        }

        Pokemon.findByName(vm.user.pokemon.name).then(function (result) {
            vm.user.pokemon.id = result.id;
            vm.user.pokemon.image = result.sprites.front_default;
            vm.user.pokemon.type = result.types[0].type.name;
        }).catch(function (result) {
            vm.user.pokemon.image = 'http://i.imgur.com/HddtBOT.png';
        });
    }
})();
