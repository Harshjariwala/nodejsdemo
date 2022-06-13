const router = require('express').Router();

router.get('/', (req, res, next) => res.redirect('web/auth'));

router.use('/api', require("./api"));
router.use('/web', require("./web"));

module.exports = router;