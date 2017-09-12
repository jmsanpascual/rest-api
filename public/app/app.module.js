(function () {
    'use strict';

    angular
        .module('restApi', [
            'ui.router',
            'user',
            'user.missing',
            'profile',
            'pokemon',
            'filters.capitalize'
        ])
        .config(function ($urlRouterProvider) {
            $urlRouterProvider.otherwise('/user');
        });
})()
