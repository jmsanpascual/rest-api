var UserPage = require('./userpage.po');

describe('User Page', function () {
    var userPage = new UserPage();

    beforeEach(function () {
        userPage.get();
    });

    it('should not show the user form by default', function () {
        expect(userPage.userForm.isDisplayed()).toBeFalsy();
    });

    describe('when clicking the plus sign button', function () {
        beforeEach(function () {
            userPage.btnShowUserForm.click();
        });

        it('should show the user form', function () {
            expect(userPage.userForm.isDisplayed()).toBeTruthy();
        });

        describe('then adding a user', function () {
            var previousCount = 0;

            beforeEach(function () {
                userPage.setName('Gian');
                userPage.setRole('Manager');
                userPage.setLocation('Paranaque');
                userPage.setTwitter('gpbalaag');
                userPage.setPokemon('machamp');

                userPage.userList.count().then(function (count) {
                    previousCount = count;
                    userPage.btnAddUser.click();
                });
            });

            it('should increment the length of the user list', function () {
                expect(userPage.userList.count()).toBe(previousCount + 1);
            });

            it('should have the inputed user details to the last child element', function () {
                var lastChild = userPage.userList.last();
                var panelTitle = lastChild.element(by.binding('user.name'));

                panelTitle.getText().then(function (text) {
                    expect(text).toEqual('Gian');
                });

                var panelBody = lastChild.element(by.className('panel-body'));

                panelBody.all(by.tagName('div')).getText().then(function (texts) {
                    expect(texts.length).toBe(3);
                    expect(texts).toContain('Manager');
                    expect(texts).toContain('Paranaque');
                    expect(texts).toContain('gpbalaag');
                });
            });
        });
    });
});
