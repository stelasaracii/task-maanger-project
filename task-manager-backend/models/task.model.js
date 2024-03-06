const db = require('../config/db')

class TaskModal {

    static getTasks() {
        return new Promise((resolve, reject) => {
            db.query('SELECT tasks.*, users.name AS user_name, users.email AS email FROM tasks INNER JOIN users ON tasks.user_id = users.id', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        })

    }

    static getTasksByUserId(userId) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM tasks WHERE user_id = ?';
            db.query(query, [userId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(results);
                    resolve(results);
                }
            });
        });

    }

    static createTask(taskData) {
        return new Promise(async (resolve, reject) => {
            const query = 'INSERT INTO tasks (user_id, taskName, description, status) VALUES (?, ?, ?, ?)';
            db.query(query, [taskData.userId, taskData.taskName, taskData.description, taskData.status], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    console.log(taskData);
                    taskData.id = results.insertId
                    resolve(taskData);
                }
            });
        })
    }

    static editTask(id, taskData) {
        return new Promise(async (resolve, reject) => {
            const query = 'UPDATE tasks SET taskName = ?, description = ?, status = ? WHERE id = ?';
            db.query(query, [taskData.taskName, taskData.description, taskData.status, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    taskData.id = id;
                    resolve(taskData);
                }
            });
        })
    }

    static deleteTask(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM tasks WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    if (results.affectedRows === 0) {
                        const notFoundError = new Error(`Task with ID ${id} not found`);
                        notFoundError.statusCode = 404;
                        reject(notFoundError);
                    }
                    else {
                        console.log(results, "del")
                        resolve(results);
                    }
                }
            });
        })
    }
}

module.exports = TaskModal;