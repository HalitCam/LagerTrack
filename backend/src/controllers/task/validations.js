import Joi from 'joi';

const ProductSchema = Joi.object({
  title: Joi.string().required(),
  kartonType: Joi.string().required(),
  productquantity: Joi.number().required(),
  boxquantity: Joi.number().required(),
  responsible: Joi.string(),
  completed : Joi.boolean(),
  createdAt: Joi.date().optional(),
  fbaEtiket: Joi.string().optional(),
  dhlEtiket: Joi.string().optional(),
  danger: Joi.boolean(),
  withoutLabel : Joi.boolean(),
  priority: Joi.number(),
});

export default ProductSchema;
