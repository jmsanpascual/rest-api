(function() {
    'use strict';

    angular
        .module('user.missing', [])
        .controller('MissingUserController', MissingUserController)
        .config(function ($stateProvider) {
            $stateProvider.state('404', {
                url: '/404',
                templateUrl: 'app/user/missing-user/missing-user.html',
                controller: 'MissingUserController as muc'
            });
        });

    MissingUserController.$inject = [];

    /* @ngInject */
    function MissingUserController() {
        var vm = this;
    }
})();
