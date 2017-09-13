var UserPage = function () {
    // Input texts
    this.name = element(by.model('uc.user.name'));
    this.role = element(by.model('uc.user.role'));
    this.location = element(by.model('uc.user.location'));
    this.twitter = element(by.model('uc.user.twitter'));
    this.pokemon = element(by.model('uc.user.pokemon.name'));

    // Elements
    this.userForm = element(by.css('[ng-show="uc.showUserForm"]'));

    // Elements with ng-repeat
    this.userList = element.all(by.repeater('user in uc.users'));

    // Buttons
    this.btnShowUserForm = element(by.css('[ng-click="uc.showUserForm = !uc.showUserForm"]'));
    this.btnAddUser = element(by.css('[ng-click="uc.addUser(uc.user)"]'));

    this.get = function () {
        browser.get('http://localhost/rest-api/public/#!/user');
    };

    this.setName = function (name) {
        this.name.sendKeys(name);
    };

    this.setRole = function (role) {
        this.role.sendKeys(role);
    };

    this.setLocation = function (location) {
        this.location.sendKeys(location);
    };

    this.setTwitter = function (twitter) {
        this.twitter.sendKeys(twitter);
    };

    this.setPokemon = function (pokemon) {
        this.pokemon.sendKeys(pokemon);
    };
};

module.exports = UserPage;
