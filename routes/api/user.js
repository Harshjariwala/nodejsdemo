const router = require('express').Router();
const { validate } = require('express-validation');

const { isAuth } = require('../../middlewares/authentication');
const { show, create, update, destroy } = require('../../validations/user');

const USER = require('../../controllers/api/user');

router.post('/all', isAuth, USER.all);
router.get('/:id', isAuth, validate(show, { context: true }), USER.show);
router.post('/', isAuth, validate(create, { context: true }), USER.create);
router.put('/:id', isAuth, validate(update, { context: true }), USER.update);
router.delete('/:id', isAuth, validate(destroy, { context: true }), USER.destroy);

module.exports = router;