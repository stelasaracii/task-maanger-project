const TaskModel = require('../models/task.model');

const TaskController = {

    getAllTasks: async (req, res) => {
        try {
            const Tasks = await TaskModel.getTasks();
            res.status(200).json(Tasks);
        } catch (error) {
        console.error('Error fetching Tasks:', error);
            res.status(500).json({ message: 'Failed to retrieve Tasks' });
        }
    },

    getTaskById: async (req, res) => {
        try {
            const { id } = req.params;
            const Task = await TaskModel.getTaskById(id);
            res.status(200).json(Task);
        } catch (error) {
            console.error('Error fetching Task:', error);
            res.status(500).json({ message: 'Failed to retrieve Task' });
        }
    },

    getTasksByUserId: async (req, res) => {
        try {
           const Tasks = await TaskModel.getTasksByUserId(req.userId);
            res.status(200).json(Tasks);
        } catch (error) {
            console.error('Error fetching Tasks:', error);
            res.status(500).json({ message: 'Failed to retrieve Tasks' });
        }
    },

    createTask: async (req, res) => {
        try {
            const { taskName, description, status } = req.body;
            const userId = req.userId;
            const Task = await TaskModel.createTask({
                taskName,
                description,
                status,
                userId
            });
            res.status(200).json(Task);
        } catch (error) {
            console.error('Error fetching Task:', error);
            res.status(500).json({ message: error.message });
        }
    },

    editTask: async (req, res) => {
        try {
            const {taskName, description, status} = req.body;
            const { id } = req.params; 
            const result = await TaskModel.editTask(id, {
                taskName,
                description,
                status
            });
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Task not found" });
            }
            res.json(result);
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ message: error.message });
        }
    },  

    deleteTaskById: async (req, res) => {
        try {
            const { id } = req.params;
            await TaskModel.deleteTask(id);
            res.status(200).json({message: 'Successfully deleted!'});
        } catch (error) {
            console.error('Error deleting Task:', error);
            res.status(500).json({ message: 'Failed to delete Task' });
        }
    },
    
}

module.exports = TaskController;