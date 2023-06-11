import Joi from "joi";
 const createBrandSchema = Joi.object({
  name: Joi.string().min(2).max(20).required()
});
 const getBrandSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});
 const updateBrandSchema = Joi.object({
  id: Joi.string().hex().length(24),
  name: Joi.string().min(2).max(20).required()
});
export {
  getBrandSchema,updateBrandSchema,createBrandSchema
}