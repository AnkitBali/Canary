const { ErrorResponse } = require('../handlers/response-handlers.js');
const JwtTokenMiddleware = require('../middlewares/token');

const AdminRoute = async function (req, res, next) {
    const notAllowed = ErrorResponse(res, 'Unauthorized: Invalid or Nonexistent credentials', 401);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return next(notAllowed);

    // Get the token and decode it and check the role.
    // If the role is not admin, return an error.
    // If the role is admin, continue.
    const isTokenVerified = JwtTokenMiddleware.verify(token);

    if (isTokenVerified) {
        const decoded = JwtTokenMiddleware.getPayload(token);
        next();
    }
    else {
        return next(notAllowed);
    }

}

const SecuredRoute = function (req, res, next) {
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization;
    }

    if (!token) return res.status(401).json({
        code: 401,
        message: 'Unauthorized: Invalid or Nonexistent credentials'
    });

    const isTokenVerified = JwtTokenMiddleware.verify(token);

    if (isTokenVerified) {
        const decoded = isTokenVerified;
        req.uid = decoded.uid;
        req.role = decoded.role;
        next();
    }
    else {
        return ErrorResponse(res, 'Malformed token from client', 401);
    }
}

module.exports = {
    SecuredRoute,
    AdminRoute
};