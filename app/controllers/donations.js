'use strict';

const User = require('../models/user');
const Donation = require('../models/donation');
const Candidate = require('../models/candidate');
const Joi = require('joi');

exports.home = {

    handler: function (request, reply) {
        Candidate.find({}).then(candidates => {
            reply.view('home', {
                title: 'Make a Donation',
                candidates: candidates
            });
        }).catch(err => {
            reply.redirect('/');
        });
    }
};

exports.report = {

    handler: function (request, reply) {
        Donation.find({}).populate('donor').populate('candidate').then(allDonations => {
            reply.view('report', {
                title: 'Donations to Date',
                donations: allDonations,
                totalDonationsAmount: function () {
                    let totalDonations = 0;

                    for (let i = 0; i < allDonations.length; i++) {
                        totalDonations += allDonations[i].amount;
                    }

                    return totalDonations;
                }
            });
        }).catch(err => {
            reply.redirect('/');
        });
    }
};

exports.donate = {
    validate: {
        payload: {
            amount: Joi.number().required(),
            method: Joi.string().required(),
            candidate: Joi.string().required()
        },

        failAction: function (request, reply, source, error) {
            Candidate.find({}).then(candidates => {
                reply.view('home', {
                    title: 'Donation error',
                    errors: error.data.details,
                    candidates: candidates
                });
            }).catch(err => {
                reply.redirect('/');
            });
        },

        options: {
            abortEarly: false
        }
    },
    handler: function (request, reply) {
        var userEmail = request.auth.credentials.loggedInUser;
        User.findOne({email: userEmail}).then(user => {
            let data = request.payload;
            const donation = new Donation(data);
            const rawCandidate = request.payload.candidate.split(',');
            Candidate.findOne({
                lastName: rawCandidate[0],
                firstName: rawCandidate[1]
            }).then(candidate => {
                donation.donor = user._id;
                donation.candidate = candidate._id;
                donation.save().then(newDonation => {
                    reply.redirect('/report');
                });
            }).catch(err => {
                reply.redirect('/');
            });
        }).catch(err => {
            reply.redirect('/');
        });
    }
};
