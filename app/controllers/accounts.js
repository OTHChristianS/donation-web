'use strict';

exports.main = {
    auth: false,
    handler: function (request, reply) {
        reply.view('main', {title: 'Welcome to Donations'});
    }

};

exports.signup = {
    auth: false,
    handler: function (request, reply) {
        reply.view('signup', {title: 'Sign up for Donations'});
    }

};

exports.login = {
    auth: false,
    handler: function (request, reply) {
        reply.view('login', {title: 'Login to Donations'});
    }

};

exports.authenticate = {
    auth: false,
    handler: function (request, reply) {
        reply.redirect('/home');
    }

};

exports.logout = {

    handler: function (request, reply) {
        reply.redirect('/');
    }

};

exports.register = {
    auth: false,
    handler: function (request, reply) {
        const user = request.payload;
        this.currentUser = user;
        this.users.push(user);
        reply.redirect('/home');
    }

};
