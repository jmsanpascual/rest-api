/* global inject */

describe('UserController', function () {
    var $controller, $httpBackend;
    var UserController, UserFactory;

    var userList = [
        { id: '1', name: 'Jane', role: 'Designer', location: 'New York', twitter: 'gijane', pokemon: { name: 'blastoise' } },
        { id: '2', name: 'Bob', role: 'Developer', location: 'New York', twitter: 'billybob', pokemon: { name: 'ditto' } },
        { id: '3', name: 'Jim', role: 'Developer', location: 'Chicago', twitter: 'jimbo', pokemon: { name: 'charizard' } },
        { id: '4', name: 'Bill', role: 'Designer', location: 'LA', twitter: 'dabill', pokemon: { name: 'mew' }  }
    ];

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('user'));

    beforeEach(inject(function ($injector) {
        $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');
        UserFactory = $injector.get('User');

        UserController = $controller('UserController', { User: UserFactory });

        spyOn(UserController, '$onInit').and.callThrough();
        spyOn(UserFactory, 'all').and.callThrough();

        $httpBackend.whenGET('../person').respond(userList);
        UserController.$onInit();
        $httpBackend.flush();
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be defined', function () {
        expect(UserController).toBeDefined();
    });

    describe('.$onInit()', function () {
        it('should execute upon UserController initialization', function () {
            expect(UserController.$onInit).toHaveBeenCalled();
        });

        it('should call User.all()', function () {
            expect(UserFactory.all).toHaveBeenCalled();
        });

        it('should store the fetched users to vm.users', function () {
            expect(UserController.users).toEqual(userList);
        });
    });

    describe('.addUser(userData)', function () {
        var createUser = {
            name: 'Jhom',
            role: 'Web Developer',
            location: 'Manila',
            twitter: 'jmsanpascual',
            pokemon: {
                name: 'mewtwo'
            }
        };

        beforeEach(function () {
            spyOn(UserController, 'addUser').and.callThrough();
            spyOn(UserFactory, 'save').and.callThrough();
        });

        describe('called with correct parameters', function () {
            beforeEach(function () {
                $httpBackend.whenPOST('../person').respond({ id: 5 });
                UserController.user = createUser;
                UserController.addUser(createUser);
                $httpBackend.flush();
            });

            it('should execute and call UserFactory.save(userData)', function () {
                expect(UserController.addUser).toHaveBeenCalledWith(createUser);
                expect(UserFactory.save).toHaveBeenCalledWith(createUser);
            });

            it('should add an id property to userData', function () {
                expect(createUser.id).toBeDefined();
            });

            it('should insert the userData to vm.users', function () {
                expect(UserController.users).toContain(createUser);
            });

            it('should reset the value of vm.user', function () {
                expect(UserController.user).toEqual({
                    pokemon: { name: '' }
                });
            });
        });

        describe('called with no parameters', function () {
            beforeEach(function () {
                UserController.addUser();
            });

            it('should do nothing', function () {
                expect(UserFactory.save).not.toHaveBeenCalled();
            });
        });
    });

    describe('.deleteUser(userId, index)', function () {
        var id = 1;
        var index = 0;
        var removeUser = {
            id: '1',
            name: 'Jane',
            role: 'Designer',
            location: 'New York',
            twitter: 'gijane',
            pokemon: { name: 'blastoise' }
        };

        beforeEach(function () {
            spyOn(UserController, 'deleteUser').and.callThrough();
            spyOn(UserFactory, 'delete').and.callThrough();

            $httpBackend.whenDELETE('../person/' + id).respond(true);
            UserController.deleteUser(id, index);
            $httpBackend.flush();
        });

        it('should execute and call User.delete(userId)', function () {
            expect(UserController.deleteUser).toHaveBeenCalledWith(id, index);
            expect(UserFactory.delete).toHaveBeenCalledWith(id);
        });

        it('should remove the user from vm.users array', function () {
            expect(UserController.users.length).toBe(3);
            expect(UserController.users).not.toContain(removeUser);
        });
    });
});
