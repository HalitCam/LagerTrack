import Joi from 'joi';

const ProductSchema = Joi.object({
  title: Joi.string().required(),
  kartonType: Joi.string().required(),
  productquantity: Joi.number().required(),
  boxquantity: Joi.number().required(),
  responsible: Joi.string(),
  createdAt: Joi.date().optional(),
  fbaEtiket: Joi.string().optional(),
  dhlEtiket: Joi.string().optional(),
});

export default ProductSchema;
