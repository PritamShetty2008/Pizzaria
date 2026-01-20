const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  externalId: { type: String, index: true }, // maps your "id" like "0001"
  name: { type: String, required: true, trim: true }, // e.g. "Paneer Tikka"
  type: { type: String, enum: ['veg', 'non-veg', 'vegan', 'other'], default: 'other' },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  ingredients: [{ type: String }], // e.g. ["dough/flour", "pizza sauce"]
  toppings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }], // normalized toppings reference
  // If you prefer storing toppings as strings, switch toppings to: [{ type: String }]
  available: { type: Boolean, default: true },
  sizes: [{ name: String, price: { type: Number, min: 0 } }]
}, { timestamps: true });

pizzaSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Pizza', pizzaSchema);