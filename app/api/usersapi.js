'use strict';

const User = require('../models/user');
const Boom = require('boom');

exports.find = {
    auth: false,
    handler: function (request, reply) {
        User.find({}).exec().then(users => {
            reply(users);
        }).catch(err => {
            reply(Boom.badImplementation('error accessing db'));
        });
    }
};

exports.create = {
    auth: false,
    handler: function (request, reply) {
        const user = new User(request.payload);
        user.save().then(newUser => {
            reply(newUser).code(201);
        }).catch(err => {
            reply(Boom.badImplementation('error creating user'));
        });
    }
};

exports.deleteAll = {
    auth: false,
    handler: function (request, reply) {
        User.remove({}).then(err => {
            reply().code(204);
        }).catch(err => {
            reply(Boom.badImplementation('error removing user'));
        });
    }
};

exports.deleteOne = {
    auth: false,
    handler: function (request, reply) {
        User.remove({_id: request.params.id}).then(user => {
            reply(user).code(204);
        }).catch(err => {
            reply(Boom.notFound('id not found'));
        });
    }
};
