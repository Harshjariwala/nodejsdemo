/**
 * USER PAGE RENDER
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
exports.index = async (req, res, next) => {
  res.render('user');
}