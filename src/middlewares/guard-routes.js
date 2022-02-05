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
    JwtTokenMiddleware.verify(token);
    next();
}

const SecuredRoute = function (req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) return res.status(401).json({
        code: 401,
        message: 'Unauthorized: Invalid or Nonexistent credentials'
    });

    next();
}

module.exports = {
    SecuredRoute,
    AdminRoute
};