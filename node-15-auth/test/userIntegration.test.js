const server = require('../server.js');
const dbHandler = require('./memory-db-handler');
const Bcrypt = require('bcrypt');
const userService = require('../src/auth/userService');
const mockUser = require('./dataProvider').mockUser;
const mockNewUser = require('./dataProvider').mockNewUser;
const mockAdmin = require('./dataProvider').mockAdmin;

let savedUser;
let savedAdmin;
let hapiServer;

beforeAll(async () => {
    hapiServer = await server.init();
    await dbHandler.connect();
    savedUser = await userService.save(null, mockUser);
    savedAdmin = await userService.save(null, mockAdmin);
});

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await dbHandler.clearDatabase();
    await hapiServer.stop();
    await dbHandler.closeDatabase();
});

const getUserToken = async () => {
    const basicAuth =  mockUser.username + ':' + mockUser.password;
    const resToken = await hapiServer.inject({
        method: 'GET',
        url: '/token',
        headers: {'Authorization': 'Basic ' + new Buffer(basicAuth).toString('base64')}
    });
    return resToken.result.token;
}

const getAdminToken = async () => {
    const basicAuth =  mockAdmin.username + ':' + mockAdmin.password;
    const resToken = await hapiServer.inject({
        method: 'GET',
        url: '/token',
        headers: {'Authorization': 'Basic ' + new Buffer(basicAuth).toString('base64')}
    });
    return resToken.result.token;
}

describe('GET /users ', () => {
    it('responds 401 Unauthorized', async () => {
        const res = await hapiServer.inject({
            method: 'GET',
            url: '/users'
        });
        expect(res.statusCode).toEqual(401);
    });

    it('responds 200', async () => {
        const res = await hapiServer.inject({
            method: 'GET',
            url: '/users',
            headers: {
                'Authorization': 'Bearer ' + await getAdminToken(),
                'Content-Type': 'application/json'
            }
        });
        expect(res.statusCode).toEqual(200);
    });
});

describe('POST /users ', () => {
    it('responds 401 Unauthorized', async () => {
        const res = await hapiServer.inject({
            method: 'POST',
            url: '/users',
            payload: mockUser
        });
        expect(res.statusCode).toEqual(401);
    });

    it('responds 403 Forbidden', async () => {

        const res = await hapiServer.inject({
            method: 'POST',
            url: '/users',
            payload: mockUser,
            headers: {
                'Authorization': 'Bearer ' + await getUserToken(),
                'Content-Type': 'application/json'
            }
        });
        expect(res.statusCode).toEqual(403);
    });

    it('responds 400 BadRequest', async () => {

        const res = await hapiServer.inject({
            method: 'POST',
            url: '/users',
            payload: mockUser,
            headers: {
                'Authorization': 'Bearer ' + await getAdminToken(),
                'Content-Type': 'application/json'
            }
        });
        expect(res.statusCode).toEqual(400);
    });

    it('responds 200', async () => {

        const res = await hapiServer.inject({
            method: 'POST',
            url: '/users',
            payload: mockNewUser,
            headers: {
                'Authorization': 'Bearer ' + await getAdminToken(),
                'Content-Type': 'application/json'
            }
        });
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /token ', () => {
    it('responds 401 Unauthorized', async () => {
        const res = await hapiServer.inject({
            method: 'GET',
            url: '/token'
        });
        expect(res.statusCode).toEqual(401);
    });

    it('responds 400 BadRequest', async () => {
        const res = await hapiServer.inject({
            method: 'GET',
            url: '/token',
            headers: {'Authorization': 'Basic username:password'}
        });
        expect(res.statusCode).toEqual(400);
    });

    it('responds 200 with user token', async () => {
        const basicAuth =  mockUser.username + ':' + mockUser.password;
        const res = await hapiServer.inject({
            method: 'GET',
            url: '/token',
            headers: {'Authorization': 'Basic ' + new Buffer(basicAuth).toString('base64')}
        });
        expect(res.statusCode).toEqual(200);
        expect(res.result.token).not.toBeNull();
    });

    it('responds 200 with admin token', async () => {
        const basicAuth =  mockAdmin.username + ':' + mockAdmin.password;
        const res = await hapiServer.inject({
            method: 'GET',
            url: '/token',
            headers: {'Authorization': 'Basic ' + new Buffer(basicAuth).toString('base64')}
        });
        expect(res.statusCode).toEqual(200);
        expect(res.payload.token).not.toBeNull();
    });
});