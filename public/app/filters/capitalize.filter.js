(function() {
    'use strict';

    angular
        .module('filters.capitalize', [])
        .filter('capitalize', capitalize);

    function capitalize() {
        return capitalizeFilter;

        function capitalizeFilter(word) {
            return (word) ? word.charAt(0).toUpperCase() + word.substring(1) : '';
        }
    }
})();
