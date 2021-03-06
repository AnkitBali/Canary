// Controllers
const EmailAuthController = require('../../../controllers/authentication/email-auth-controller.js');

// Validators
const { body } = require('express-validator');

// Guard middleware
const { SecuredRoute } = require('../../../middlewares/guard-routes.js');

const router = require('express').Router();

router.post('/signup', body('email').isEmail(), body('password').isStrongPassword({
    minLength: 3,
    minNumbers: 1,
    minUppercase: 1,
}), EmailAuthController.EmailSignUp);

router.post('/login', body('email').isEmail(), body('password').notEmpty(), EmailAuthController.EmailLogin);

router.post('/complete-profile', SecuredRoute, EmailAuthController.CompleteProfile);

module.exports = router;