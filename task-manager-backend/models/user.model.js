const db = require('../config/db')
const bcrypt = require('bcryptjs');

class UserModel {
    static getUsers() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        })
    }
    static createUsers(userData) {
        return new Promise(async (resolve, reject) => {
            const query = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';
            const hash = await hashPassword(userData.password);
            db.query(query, [userData.name, userData.email, hash, userData.role], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    userData.id = results.insertId;
                    resolve(userData);
                }
            });
        })
    }

    static getUserById(id) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        })
    }

    static getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE email = ?';
            db.query(query, [email], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const user = results.length > 0 ? results[0] : null;
                    resolve(user);
                }
            });
        })
    }

    static editUser(id, userData) {
        return new Promise(async (resolve, reject) => {
            const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
            // const hash = await hashPassword(userData.password);
            db.query(query, [userData.name, userData.email, id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    userData.id = id;
                    userData.password = "";
                    resolve(userData);
                }
            });
        })
    }

    static deleteUserById(id) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM users WHERE id = ?';
            db.query(query, [id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        })
    }
}

async function hashPassword(password) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

module.exports = UserModel;

