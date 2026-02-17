import Joi from 'joi';

const Schema = Joi.object({
  username: Joi.string().min(5).required(),
  password: Joi.string().min(3).required(),
  // allow optional role during registration for local testing (admin/user)
  role: Joi.string().valid('user','admin').optional(),
});

export default Schema;

