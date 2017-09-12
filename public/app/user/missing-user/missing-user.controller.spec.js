/* global inject */

describe('User.missing Module', function () {
    var $controller, MissingUserController;

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('user.missing'));

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
        MissingUserController = $controller('MissingUserController', {});
    }));

    it('should be defined', function () {
        expect(MissingUserController).toBeDefined();
    });
});
