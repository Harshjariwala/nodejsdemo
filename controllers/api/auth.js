const passport = require('passport');
const APIError = require('../../utils/APIError');
const { toObject, generateJwt, removeFields } = require('../../utils/helper');
const USER = require('../../models/user');

/**
 * USER LOGIN
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
exports.login = async (req, res, next) => {

  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) throw new APIError({ status: 401, message: err ? err.message : 'Unauthorized access' });

      req.login(user, { session: false }, async (err) => {
        if (err) throw new APIError();
        const body = { _id: user._id, firstName: user.firstName, email: user.email };
        const token = generateJwt({ user: body });
        user = toObject(user);
        user.token = "Bearer " + token;

        req.session.user = user;
        return res.sendJson(200, { data: user, message: info.message });
      });
    }
    catch (err) { next(err); }
  })(req, res, next);
};

/**
 * USER LOGOUT
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 * @returns
 */
exports.logout = async (req, res) => {
  req.session.destroy();
  return res.sendJson(200, "Logout successfully.");
}