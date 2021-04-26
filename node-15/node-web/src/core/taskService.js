'use strict';
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
fetch.Promise = Bluebird;
const Boom = require('@hapi/boom');
const { settings } = require('../../config/settings.js')

exports.createTask = async (credentials, task) => {

	const response  = await fetch(settings.coreAPI + '/tasks', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.token,
        },
        body: JSON.stringify(task)
    }).catch((err) => {throw Boom.serverUnavailable('Core Service is unavailable.')});
    const status = await response.status;
    const data = await response.json();
    return {status: status, data: data};
}

exports.getTasks = async (credentials) => {

	const response  = await fetch(settings.coreAPI + '/tasks', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + credentials.token,
        }
    }).catch((err) => {throw Boom.serverUnavailable('Core Service is unavailable.')});
    const status = await response.status;
    const data = await response.json();
    
    return {status: status, data: data};
}