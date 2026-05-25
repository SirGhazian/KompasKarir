const Joi = require("joi");

// schema validasi untuk POST /api/reviews
const reviewSchema = Joi.object({
  nama: Joi.string().max(100).required().messages({
    "string.max": "Nama maksimal 100 karakter",
    "any.required": "Field nama wajib diisi",
  }),

  rating: Joi.number().integer().min(1).max(5).required().messages({
    "number.min": "Rating minimal 1",
    "number.max": "Rating maksimal 5",
    "any.required": "Field rating wajib diisi",
  }),

  text: Joi.string().max(500).required().messages({
    "string.max": "Ulasan maksimal 500 karakter",
    "any.required": "Field text wajib diisi",
  }),
});

module.exports = { reviewSchema };
