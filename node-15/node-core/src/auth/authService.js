'use strict';
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
const Boom = require('@hapi/boom');
const { settings } = require('../../config/settings.js')

exports.isValidUserId = async (userId, token) => {
	const url = settings.authAPI + '/users/' + userId;
	console.log(url);
	const res = await fetch(url, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).catch((err) => {throw Boom.serverUnavailable('Auth Service is unavailable.')});
    return (await res.status) === 200;
}