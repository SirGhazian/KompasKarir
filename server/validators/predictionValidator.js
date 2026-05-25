const Joi = require("joi");

// schema validasi untuk POST /api/predictions
const predictionSchema = Joi.object({
  answers: Joi.object()
    .pattern(Joi.string(), Joi.number().integer().min(1).max(5))
    .min(1)
    .required()
    .messages({
      "object.min": "Jawaban quiz tidak boleh kosong",
      "any.required": "Field answers wajib diisi",
    }),

  nilai: Joi.object({
    bahasaIndonesia: Joi.number().min(0).max(100).required(),
    bahasaInggris: Joi.number().min(0).max(100).required(),
    matematika: Joi.number().min(0).max(100).required(),
    informatika: Joi.number().min(0).max(100).required(),
    ipa: Joi.number().min(0).max(100).required(),
    ips: Joi.number().min(0).max(100).required(),
    ppkn: Joi.number().min(0).max(100).required(),
    penjas: Joi.number().min(0).max(100).required(),
    seni: Joi.number().min(0).max(100).required(),
  }).required(),
});

module.exports = { predictionSchema };
