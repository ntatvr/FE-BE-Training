const dbHandler = require('../memory-db-handler');
const userService = require('../../src/auth/userService');
const Bcrypt = require('bcrypt');
const validPayload = require('../dataProvider').mockUser;

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await dbHandler.connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await dbHandler.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await dbHandler.closeDatabase());

describe('User ', () => {

    it('not found', async () => {
        expect(async () => await userService.findById('607cf900ff926409586d2e4f'))
        .rejects
        .toThrowError('User not found');
    });
});

describe('User ', () => {

    it('can be found', async () => {
        const savedUser = await userService.save(null, validPayload);
        const user = await userService.findById(savedUser.id);
        expect(user.id).not.toBeNull();
        expect(user.username).toEqual(savedUser.username);
        expect(user.password).toEqual(savedUser.password);
        expect(new Set(user.scope)).toEqual(new Set(savedUser.scope));
    });
});

describe('User ', () => {

    it('can not be created without request body', async () => {
        expect(async () => await userService.save(null, null))
        .rejects
        .toThrowError('Mising request body');
    });
});

describe('User ', () => {

    it('can be created successful', async () => {
        const user = await userService.save(null, validPayload);
        expect(user.id).not.toBeNull();
        expect(user.username).toEqual(validPayload.username);
        expect(await Bcrypt.compare(validPayload.password, user.password)).toBeTruthy();
        expect(new Set(user.scope)).toEqual(new Set(validPayload.scope));
    });
});
