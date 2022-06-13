const passport = require('passport');
const APIError = require('../utils/APIError');
const { capitalize } = require('../utils/helper');

const handleJWT = (req, res, next) => async (err, user, info) => {
  try {
    if (err || info || !user) {
      const error = err || info.message;
      throw new APIError({ status: 401, message: error ? capitalize(error) : 'Unauthorized access' })
    }
    req.user = user;
    return next();
  } catch (err) {
    next(err);
  }
};

exports.isAuth = (req, res, next) => {
  passport.authenticate('authentication', { session: false }, handleJWT(req, res, next))(req, res, next)
};

exports.isRenderAuth = (req, res, next) => {
  try {
    if (req.session) next();
    return res.redirect('/');
  } catch (err) {
    res.redirect('/');
    next(err);
  }
};
