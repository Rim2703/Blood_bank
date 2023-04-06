const jwt = require('jsonwebtoken')

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Authentication token missing' });
    }
    const tokens = token.split(' ')[1];
    try {
        const decodedToken = jwt.verify(tokens, 'secret_key');
        req.user = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid authentication token' });
    }
}


module.exports = { authenticate }