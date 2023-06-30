const { validationResult } = require("express-validator");

const ValidatorMiddleware = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    // return res.send(`Hello, ${req.query.person}!`);
    // res.send();
    return res.status(400).json({ errors: result.array() });
  }
  next();
};

module.exports = ValidatorMiddleware;
