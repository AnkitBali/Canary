const router = require('express').Router();

router.use('/auth', require('./authentication-routes.js'));

module.exports = router;