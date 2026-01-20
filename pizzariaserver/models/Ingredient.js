const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  externalId: { type: String, index: true }, // maps your "id" like "0001" or "101"
  name: { type: String, required: true, trim: true }, // e.g. "Pepperoni"
  type: { type: String, enum: ['veg', 'non-veg', 'vegan', 'other'], default: 'other' },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  unit: { type: String, default: 'unit' },
  inStock: { type: Boolean, default: true },
  meta: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

ingredientSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);