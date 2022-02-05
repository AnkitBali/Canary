const router = require('express').Router();

const AuthenticationRoutes = require('./authentication');

router.use(AuthenticationRoutes);

module.exports = router;