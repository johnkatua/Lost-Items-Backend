const joi = require('joi');

const genreValidation = (data) => {
  const schema = joi.object().keys({
    name: joi.string().min(3).max(255).required(),
  });
  return schema.validate(data);
};

module.exports = genreValidation;