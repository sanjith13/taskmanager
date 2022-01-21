const jwt = require('jsonwebtoken');
const UnauthenticatedError = require('../errors/unauthenticated');

const authentication = async (req, res ,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid');
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, process.env.JwtToken);
        req.user = {userId: payload.userId , name: payload.name};
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
}

module.exports = authentication;