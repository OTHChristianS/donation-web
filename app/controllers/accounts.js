'use strict';

const User = require('../models/user');

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
        const user = request.payload;
        User.findOne({email: user.email}).then(foundUser => {
            if (foundUser && foundUser.password === user.password) {
                request.cookieAuth.set({
                    loggedIn: true,
                    loggedInUser: user.email,
                });
                reply.redirect('/home');
            } else {
                reply.redirect('/signup');
            }
        }).catch(err => {
            reply.redirect('/');
        });
    },

};

exports.logout = {
    auth: false,
    handler: function (request, reply) {
        request.cookieAuth.clear();
        reply.redirect('/');
    }
};

exports.register = {
    auth: false,
    handler: function (request, reply) {
        const user = new User(request.payload);

        user.save().then(newUser => {
            reply.redirect('/login');
        }).catch(err => {
            console.log(err);
            reply.redirect('/');
        });
    },

};

exports.viewSettings = {
    handler: function (request, reply) {
        const userEmail = request.auth.credentials.loggedInUser;
        const currentUser = this.users[userEmail];
        reply.view('settings', {
            title: 'Edit Account Settings',
            user: currentUser
        });
    }
};

exports.updateSettings = {
    handler: function (request, reply) {
        const modifiedUser = request.payload;
        const userEmail = request.auth.credentials.loggedInUser;
        delete this.users[userEmail];
        this.users[modifiedUser.email] = modifiedUser;
        console.log(this.users);
        request.cookieAuth.clear();
        request.cookieAuth.set({
            loggedIn: true,
            loggedInUser: modifiedUser.email,
        });
        reply.redirect('/settings');
    }
};
