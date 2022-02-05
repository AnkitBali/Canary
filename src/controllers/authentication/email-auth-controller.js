
const { validationResult } = require('express-validator');
const { ErrorResponse, SuccessResponse } = require('../../handlers/response-handlers.js');

// Service
const EmailAuthService = require('../../services/authentication/email-auth-service.js');

const _ = {};

_.EmailSignUp = async function (req, res,) {
    try {
        console.log(req.body);
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const { email, password } = req.body;

            await EmailAuthService.signUpWithEmail(email, password, (err, result) => {
                if (err) {
                    return ErrorResponse(res, err);
                }
                return SuccessResponse(res, result);
            });
        }
        else {
            return ErrorResponse(res, errors.array());
        }
    } catch (e) {
        return ErrorResponse(res, e.message);
    }
}

module.exports = _;