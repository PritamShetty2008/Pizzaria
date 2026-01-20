const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza' }, // optional, for normalized cart
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, default: '' },
  quantity: { type: Number, default: 1, min: 1 },
  customIngredients: [{ type: String }], // e.g. ["Pepperoni", "Mushrooms"]
  customIngredientsPrice: { type: Number, default: 0, min: 0 }
}, { timestamps: true });

cartSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

module.exports = mongoose.model('Cart', cartSchema);