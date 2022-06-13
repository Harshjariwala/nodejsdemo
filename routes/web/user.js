const router = require('express').Router();

const USER = require('../../controllers/web/user');
const { isRenderAuth } = require('../../middlewares/authentication');

router.get('/', isRenderAuth, USER.index);

module.exports = router;