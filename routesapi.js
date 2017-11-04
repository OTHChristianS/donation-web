const CandidatesApi = require('./app/api/candidatesapi');

module.exports = [
    {method: 'POST', path: '/api/candidates', config: CandidatesApi.create},
    {method: 'DELETE', path: '/api/candidates/{id}', config: CandidatesApi.deleteOne},
    {method: 'DELETE', path: '/api/candidates', config: CandidatesApi.deleteAll},
    {method: 'GET', path: '/api/candidates/{id}', config: CandidatesApi.findOne},
    {method: 'GET', path: '/api/candidates', config: CandidatesApi.find}
];
