(function () {
    'use strict';

    angular
        .module('restApi')
        .controller('AppController', AppController);

    // Inject to safely minification
    AppController.$inject = ['$http'];

    function AppController($http) {
        var vm = this;
        var shouldUpdate = false;

        vm.$onInit = function () {
            vm.person = {};
            $http.get('../person').then(function (response) {
                vm.persons = response.data;
            });
        };

        vm.saveOrUpdate = function (person) {
            var method = shouldUpdate ? 'put' : 'post';
            var url = '../person';

            if (shouldUpdate) {
                method = 'put';
                url += '/' + person.id;
            }

            $http[method](url, person).then(function (response) {
                if (!shouldUpdate) {
                    person.id = response.data;
                    vm.persons.push(person);
                } else {
                    vm.personUpdate.first_name = response.data.first_name;
                    vm.personUpdate.last_name = response.data.last_name;
                    vm.personUpdate.contact_number = response.data.contact_number;
                    shouldUpdate = false;
                }

                // Clear the form
                vm.person = {};
            });
        };

        vm.view = function (person) {
            $http.get('../person/' + person.id, person).then(function (response) {
                vm.person = response.data;
                vm.personUpdate = person;
                shouldUpdate = true;
            });
        };

        vm.delete = function (person, index) {
            $http.delete('../person/' + person.id, person).then(function (response) {
                vm.persons.splice(index, 1);
            });
        };
    }
})();
