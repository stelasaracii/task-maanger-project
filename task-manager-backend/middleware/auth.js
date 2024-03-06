const jwt = require('jsonwebtoken')
module.exports = (requiredRoles) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            const error = new Error('Authorization header is missing');
            error.statusCode = 401;
            return next(error);
        }

        const token = authHeader.split(' ')[1];
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        }
        catch (err) {
            console.log(err);
            err.statusCode = 500;
            return res.status(500).json({ error: 'Internal server error' });
        }
        if (!decodedToken) {
            const error = new Error('Not authenticated');
            error.statusCode = 401;
            throw error;
        }
        if (!requiredRoles.includes(decodedToken.role)) {
            const error = new Error('Unauthorized');
            error.statusCode = 403;
            return next(error);
        }
        req.userId = decodedToken.userId;
        next();
    }
}
