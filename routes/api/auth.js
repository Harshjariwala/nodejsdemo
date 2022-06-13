const router = require('express').Router();
const { validate } = require('express-validation');
const { login } = require('../../validations/auth');
const AUTH = require('../../controllers/api/auth');

router.post('/login', validate(login, { context: true }), AUTH.login);
router.get('/logout', AUTH.logout);

module.exports = router;