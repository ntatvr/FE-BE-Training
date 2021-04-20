const dbHandler = require('../memory-db-handler');
const taskService = require('../../src/core/taskService');
const validPayload = require('../dataProvider').mockTask;
const reporter = '607cf900ff926409586d2e4f';
beforeAll(async () => await dbHandler.connect());

afterEach(async () => await dbHandler.clearDatabase());

afterAll(async () => await dbHandler.closeDatabase());

describe('Task ', () => {

    it('not found', async () => {
        expect(async () => await taskService.findById(reporter))
        .rejects
        .toThrowError('Task not found');
    });
});

describe('Task ', () => {

    it('can be found', async () => {
        const savedTask = await taskService.save(null, reporter, validPayload);
        const task = await taskService.findById(savedTask.id);
        expect(task.id).not.toBeNull();
        expect(task.title).toEqual(savedTask.title);
        expect(task.description).toEqual(savedTask.description);
        expect(task.reporter).toEqual(reporter);
        expect(task.assignee).toEqual(savedTask.assignee);
        expect(task.status).toEqual(savedTask.status);
    });
});

describe('Task ', () => {

    it('can not be created without request body', async () => {
        expect(async () => await taskService.save(null, reporter, null))
        .rejects
        .toThrowError('Mising request body');
    });
});

describe('Task ', () => {

    it('can be created successful', async () => {
        const task = await taskService.save(null, reporter, validPayload);
        expect(task.id).not.toBeNull();
        expect(task.title).toEqual(validPayload.title);
        expect(task.description).toEqual(validPayload.description);
        expect(task.reporter).toEqual(reporter);
        expect(task.assignee).toEqual(validPayload.assignee);
        expect(task.status).toEqual(validPayload.status);
    });
});
