const { ValidateSignature } = require("../../utils");

module.exports = (req, res, next) => {
  const isAuthorized = ValidateSignature(req);

  if (isAuthorized) {
    return next();
  }
  return res.status(403).json({ message: "Not Authorized" });
};
