'use strict';
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
const Boom = require('@hapi/boom');

exports.isValidUserId = async (userId, token) => {
	const res = await fetch('http://localhost:3000/users/' + userId, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).catch((err) => {throw Boom.serverUnavailable('Auth Service is unavailable.')});
    return (await res.status) === 200;
}