'use strict';

const User = require('../models/user');
const Joi = require('joi');

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
    validate: {
        payload: {
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },

        failAction: function (request, reply, source, error) {
            reply.view('login', {
                title: 'Login error',
                errors: error.data.details,
            }).code(400);
        },

        options: {
            abortEarly: false,
        }
    },
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
    validate: {
        payload: {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },

        failAction: function (request, reply, source, error) {
            reply.view('signup', {
                title: 'Sign up error',
                errors: error.data.details,
            }).code(400);
        },

        options: {
            abortEarly: false,
        }
    },
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
        User.findOne({email: userEmail}).then(foundUser => {
            reply.view('settings', {title: 'Edit Account Settings', user: foundUser});
        }).catch(err => {
            reply.redirect('/');
        });
    }
};

exports.updateSettings = {
    validate: {
        payload: {
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },

        failAction: function (request, reply, source, error) {
            reply.view('settings', {
                title: 'Settings error',
                errors: error.data.details,
            }).code(400);
        },

        options: {
            abortEarly: false,
        }
    },
    handler: function (request, reply) {
        const modifiedUser = request.payload;
        const userEmail = request.auth.credentials.loggedInUser;

        User.findOne({email: userEmail}).remove();

        User.update({email: userEmail}, {
            email: modifiedUser.email,
            firstName: modifiedUser.firstName,
            lastName: modifiedUser.lastName,
            password: modifiedUser.password
        }, function (err, numberAffected, rawResponse) {
            if (err) {
                console.log(err);
                reply.redirect('/');
            } else {
                request.cookieAuth.clear();
                request.cookieAuth.set({
                    loggedIn: true,
                    loggedInUser: modifiedUser.email,
                });
                reply.redirect('/settings');
            }
        });
    }
};
