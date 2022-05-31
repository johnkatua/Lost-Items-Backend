const joi = require('joi');

const itemValidation = (data) => {
  const schema = joi.object().keys({
    name: joi.string().min(3).max(255).required(),
    description: joi.string().min(3).max(255).required(),
    photo: joi.string().min(3).max(255).required(),
    status: joi.string().valid('found', 'lost').required(),
    genreId: joi.string().min(3).max(255).required(),
    userId: joi.string().min(3).max(255).required(),
  });
  return schema.validate(data);
};

module.exports = itemValidation;