describe('UserFactory', function () {
    var $httpBackend, User, user;

    beforeEach(module('user'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        User = $injector.get('User');
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should exist', function () {
        expect(User).toBeDefined();
    });

    describe('.save(userData)', function () {
        var createUser = {
            name: 'Jhom',
            role: 'Developer',
            location: 'Manila',
            pokemon: { name: 'charizard' }
        };

        beforeEach(function () {
            spyOn(User, 'save').and.callThrough();
        });

        it('should make a POST http request', function () {
            $httpBackend.expectPOST('../person').respond(200, { id: 1 });
            User.save(createUser).then(function (res) {
                user = createUser;
                createUser.id = res.id;
            });

            $httpBackend.flush();
            expect(User.save).toHaveBeenCalledWith(createUser);
        });

        it('should return an id', function () {
            expect(createUser.id).toBeDefined();
        });
    });

    describe('.update(userData)', function () {
        var updateUser;

        beforeEach(function () {
            spyOn(User, 'update').and.callThrough();
        });

        it('should make a PUT http request', function () {
            updateUser = angular.copy(user);
            updateUser.name = 'Jhoms';

            $httpBackend.expectPUT('../person/' + user.id).respond(200, updateUser);
            User.update(updateUser).then(function (_user) {
                user = _user;
            });

            $httpBackend.flush();
            expect(User.update).toHaveBeenCalledWith(updateUser);
        });

        it('should return the updated user object', function () {
            expect(user).toEqual(updateUser);
        });
    });

    describe('.get(userId)', function () {
        var getUser;

        beforeEach(function () {
            spyOn(User, 'get').and.callThrough();
        });

        it('should make a GET request and return the user object', function () {
            var id = 1;

            $httpBackend.expectGET('../person/' + id).respond(200, user);
            User.get(id).then(function (_user) {
                getUser = _user;
            });

            $httpBackend.flush();
            expect(User.get).toHaveBeenCalledWith(id);
        });

        it('should return the user object according to the id specified', function () {
            expect(getUser).toEqual(user);
        });
    });

    describe('.all()', function () {
        var users;

        beforeEach(function () {
            spyOn(User, 'all').and.callThrough();
        });

        it('should make a GET http request', function () {
            $httpBackend.expectGET('../person').respond(200, [user]);
            User.all().then(function (_users) {
                users = _users;
            });

            $httpBackend.flush();
            expect(User.all).toHaveBeenCalled();
        });

        it('should return an array of users', function () {
            expect(users.length).toBeDefined();
            expect(users).toContain(user);
        });
    });

    describe('.delete(userId)', function () {
        var response;

        beforeEach(function () {
            spyOn(User, 'delete').and.callThrough();
        });

        it('should make a DELETE http request', function () {
            var id = 1;

            $httpBackend.expectDELETE('../person/' + id).respond(200, true);
            User.delete(id).then(function (_response) {
                response = _response;
            });

            $httpBackend.flush();
            expect(User.delete).toHaveBeenCalledWith(id);
        });

        it('should return a truthy value', function () {
            expect(response).toBeTruthy();
        });
    });
});
