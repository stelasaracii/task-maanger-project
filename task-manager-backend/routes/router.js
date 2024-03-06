const router = require('express').Router();
const UserController = require('../controllers/user.controller');
const TaskController = require('../controllers/task.controller');
const AuthController = require('../controllers/auth.controller');

const isAuth = require('../middleware/auth');

router.post('/login', AuthController.login)

router.get('/users', isAuth(["admin"]), UserController.getAllUsers);
router.get('/users/:id', isAuth(["admin"]), UserController.getUserById);
router.post('/users', isAuth(["admin"]), UserController.createUser);
router.patch('/users/:id', isAuth(["admin"]), UserController.editUser);
router.delete('/users/:id', isAuth(["admin"]), UserController.deleteUserById);

router.get('/tasks', isAuth(["admin"]), TaskController.getAllTasks);
router.get('/tasks/:id', isAuth(["user"]), TaskController.getTaskById);
router.get('/my-tasks', isAuth(["user"]), TaskController.getTasksByUserId);
router.post('/tasks', isAuth(["user", "admin"]), TaskController.createTask);
router.patch('/tasks/:id', isAuth(["user", "admin"]), TaskController.editTask);
router.delete('/tasks/:id', isAuth(["user", "admin"]), TaskController.deleteTaskById);

module.exports=router;