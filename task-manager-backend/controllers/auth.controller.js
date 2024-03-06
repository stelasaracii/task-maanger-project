const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

const AuthController = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.getUserByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }

            const secretKey = process.env.SECRET_KEY;
            const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });

            res.json({ token, role: user.role });
        }

        catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = AuthController;