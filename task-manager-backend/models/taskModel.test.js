const { getTasks, createTask, editTask, deleteTask } = require('./task.model');

jest.mock('../config/db', () => ({
  query: jest.fn(),
}));

describe('getTasks', () => {
  it('should retreive the tasks information', async () => {
    const mockResults = [
      { id: 1, name: 'Task 1', description: 'test desc', status: 'pending' },
      { id: 2, name: 'Task 2', description: 2, status: 'pending' },
    ];

    require('../config/db').query.mockImplementation((query, callback) => {
      callback(null, mockResults);
    });

    const tasks = await getTasks();
    expect(tasks).toEqual(mockResults);
  });
});

describe('createTask', () => {
  it('should create a new task', async () => {
    const taskData = { userId: 1, taskName: 'New Task', description: 'Task description', status: 'pending' };
    const mockInsertId = 1;
    const mockResults = { insertId: mockInsertId };

    require('../config/db').query.mockImplementationOnce((query, params, callback) => {
      callback(null, mockResults);
    });

    const createdTask = await createTask(taskData);
    expect(createdTask).toEqual({ ...taskData, id: mockInsertId });
  });
});

describe('editTask', () => {
  it('should edit an existing task', async () => {
    const taskId = 1;
    const updatedTaskData = { taskId: taskId, taskName: 'Updated Task', description: 'Updated description', status: 'completed' };
    
    const mockResults = { insertId: 0 };
    require('../config/db').query.mockImplementationOnce((query, params, callback) => {
      callback(null, mockResults);
    });
    
    const updatedTask = await editTask(taskId, updatedTaskData);
    expect(updatedTask).toHaveProperty('id', taskId);
    expect(updatedTask.taskName).toBe(updatedTaskData.taskName);
  });
});

describe('deleteTask', () => {
  it('should delete an existing task', async () => {
    const taskId = 1;

    require('../config/db').query.mockImplementationOnce((query, params, callback) => {
      callback(null, { affectedRows: 1 });
    });

    const deleteResult = await deleteTask(taskId);
    expect(deleteResult.affectedRows).toEqual(1);
  });
});
