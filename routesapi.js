const CandidatesApi = require('./app/api/candidatesapi');
const UsersApi = require('./app/api/usersapi');

module.exports = [
    {method: 'POST', path: '/api/users', config: UsersApi.create},
    {method: 'DELETE', path: '/api/users/{id}', config: UsersApi.deleteOne},
    {method: 'DELETE', path: '/api/users', config: UsersApi.deleteAll},
    {method: 'GET', path: '/api/users', config: UsersApi.find},
    {method: 'POST', path: '/api/candidates', config: CandidatesApi.create},
    {method: 'DELETE', path: '/api/candidates/{id}', config: CandidatesApi.deleteOne},
    {method: 'DELETE', path: '/api/candidates', config: CandidatesApi.deleteAll},
    {method: 'GET', path: '/api/candidates/{id}', config: CandidatesApi.findOne},
    {method: 'GET', path: '/api/candidates', config: CandidatesApi.find}
];
