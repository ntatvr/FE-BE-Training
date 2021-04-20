const server = require('../server.js');
const dbHandler = require('./memory-db-handler');
const taskService = require('../src/core/taskService');
const mockTask = require('./dataProvider').mockTask;
const reporter = '607cf900ff926409586d2e4f';
let savedTask;
let hapiServer;

beforeAll(async () => {
    hapiServer = await server.init();
    await dbHandler.connect();
    savedTask = await taskService.save(null, reporter, mockTask);
});


afterAll(async () => {
    await dbHandler.clearDatabase();
    await hapiServer.stop();
    await dbHandler.closeDatabase();
});

describe('GET /tasks ', () => {
    it('responds 401 Unauthorized', async () => {
        const res = await hapiServer.inject({
            method: 'GET',
            url: '/tasks'
        });
        expect(res.statusCode).toEqual(401);
    });
});