const UserModel = require('../models/user.model');

const UserController = {

    getAllUsers: async (req, res) => {
        try {
            const users = await UserModel.getUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ message: 'Failed to retrieve users' });
        }
    },

    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await UserModel.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: 'Failed to retrieve user' });
        }
    },

    createUser: async (req, res) => {
        try {
            const { name, email, password, role } = req.body;
            const user = await UserModel.createUsers({
                name,
                email,
                password,
                role
            });
            res.status(200).json(user);
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({ message: error.message });
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { id } = req.params;
            await UserModel.deleteUserById(id);
            res.status(200).json({message: 'Successfully deleted!'});
        } catch (error) {
            console.error('Error deleting user:', error);
            res.status(500).json({ message: 'Failed to delete user' });
        }
    },

    editUser: async (req, res) => {
        try {
            const {name, email, password, role} = req.body;
            const { id } = req.params; 
            const result = await UserModel.editUser(id, {
                name,
                email,
                password,
                role
            });
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(result);
        } catch (error) {
            console.error('Error updating user:', error);
            res.status(500).json({ message: error.message });
        }
    },  
}

module.exports = UserController;

