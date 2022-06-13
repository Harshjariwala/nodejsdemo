const router = require('express').Router();
const AUTH = require('../../controllers/web/auth');

router.get('/', AUTH.loginPage)

module.exports = router;