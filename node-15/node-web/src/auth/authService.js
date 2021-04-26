'use strict';
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
const Boom = require('@hapi/boom');
const { settings } = require('../../config/settings.js')

exports.getUserToken = async (username, password) => {
    const basicAuth =  username + ':' + password;
    const response  = await fetch(settings.authAPI + '/token', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + new Buffer(basicAuth).toString('base64')
        }
    }).catch((err) => {throw Boom.serverUnavailable('Auth Service is unavailable.')});
    const status = await response.status;
    const data = await response.json();
    return {status: status, data: data};
}

exports.getUsers = async (credentials) => {

    const response  = await fetch(settings.authAPI + '/users', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.token
        }
    }).catch((err) => {throw Boom.serverUnavailable('Auth Service is unavailable.')});
    const status = await response.status;
    const data = await response.json();
    return {status: status, data: data};
}

exports.isValidUserId = async (userId, token) => {
	const url = settings.authAPI + '/users/' + userId;
	const res = await fetch(url, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).catch((err) => {throw Boom.serverUnavailable('Auth Service is unavailable.')});
    return (await res.status) === 200;
}