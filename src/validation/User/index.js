const Joi = require('joi');

const registerValidation = (data) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object().keys({
    email: Joi.string().min(3).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
}