'use strict';

const assert = require('chai').assert;
var request = require('sync-request');

suite('User API tests', function () {

    test('get users', function () {
        const url = 'http://localhost:4000/api/users';
        var res = request('GET', url);
        const users = JSON.parse(res.getBody('utf8'));
        assert(users.length >= 3);

        assert.equal(users[0].firstName, 'Homer');
        assert.equal(users[0].lastName, 'Simpson');
        assert.equal(users[0].email, 'homer@simpson.com');

        assert.equal(users[1].firstName, 'Marge');
        assert.equal(users[1].lastName, 'Simpson');
        assert.equal(users[1].email, 'marge@simpson.com');

        assert.equal(users[2].firstName, 'Bart');
        assert.equal(users[2].lastName, 'Simpson');
        assert.equal(users[2].email, 'bart@simpson.com');
    });

    test('create a user', function () {
        const url = 'http://localhost:4000/api/users';
        const newUser = {
            firstName: 'Barnie',
            lastName: 'Grumble',
            email: 'barnie@grumble.com',
            password: 'topSecret'
        };

        const res = request('POST', url, {json: newUser});
        const returnedUser = JSON.parse(res.getBody('utf8'));

        assert.equal(returnedUser.firstName, newUser.firstName);
        assert.equal(returnedUser.lastName, newUser.lastName);
        assert.equal(returnedUser.email, newUser.email);
        assert.equal(returnedUser.password, newUser.password);
    });

    test('delete one user', function () {
        const allUsersUrl = 'http://localhost:4000/api/users';
        var res = request('GET', allUsersUrl);
        const users = JSON.parse(res.getBody('utf8'));
        const oneUserUrl = allUsersUrl + '/' + users[0]._id;
        res = request('DELETE', oneUserUrl);

        assert.equal(res.statusCode, 204);
    });


    test('delete all users', function () {
        const url = 'http://localhost:4000/api/users';
        const res = request('DELETE', url);

        assert.equal(res.statusCode, 204);
    });
});
