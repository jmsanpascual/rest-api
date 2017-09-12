(function() {
    'use strict';

    angular
        .module('pokemon', [])
        .factory('Pokemon', PokemonFactory);

    PokemonFactory.$inject = ['$http'];

    /* @ngInject */
    function PokemonFactory($http) {
        var API = 'http://pokeapi.co/api/v2/pokemon/';
        var Pokemon = {};

        Pokemon.findByName = function (name) {
            return $http.get(API + name).then(function (res) {
                return res.data;
            }).catch(function (res) {
                throw res.data;
            });
        };

        return Pokemon;
    }
})();
