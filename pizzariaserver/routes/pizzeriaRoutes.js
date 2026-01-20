const express = require('express');
const { body, param, validationResult } = require('express-validator');
const router = express.Router();
const Pizza = require('../models/Pizza');
const Ingredient = require('../models/Ingredient');
const Cart = require('../models/Cart');
const auth = require('../middleware/auth');

const handleErrors = (res, err) => res.status(500).json({ error: err.message });

// Fetch all pizzas
router.get('/pizzas', async (req, res) => {
  try { res.json(await Pizza.find().populate('toppings')); }
  catch (err) { handleErrors(res, err); }
});

// Fetch all ingredients
router.get('/ingredients', async (req, res) => {
  try { res.json(await Ingredient.find()); }
  catch (err) { handleErrors(res, err); }
});

// Fetch shopping cart items (auth required)
router.get('/cart', auth, async (req, res) => {
  try { res.json(await Cart.find({ userId: req.user.id }).populate('productId')); }
  catch (err) { handleErrors(res, err); }
});

// Insert an item to shopping cart (auth required)
router.post('/cart',
  auth,
  body('name').isString().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('quantity').optional().isInt({ min: 1 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const payload = { ...req.body, userId: req.user.id };
      const item = new Cart(payload);
      await item.save();
      res.status(201).json(item);
    } catch (err) { handleErrors(res, err); }
  }
);

// Update quantity of an item (auth required)
router.put('/cart/:id',
  auth,
  param('id').isMongoId(),
  body('quantity').optional().isInt({ min: 1 }),
  body('customIngredients').optional().isArray(),
  body('customIngredientsPrice').optional().isFloat({ min: 0 }),
  body('price').optional().isFloat({ min: 0 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const updateData = {};
      if (req.body.quantity !== undefined) updateData.quantity = req.body.quantity;
      if (req.body.customIngredients !== undefined) updateData.customIngredients = req.body.customIngredients;
      if (req.body.customIngredientsPrice !== undefined) updateData.customIngredientsPrice = req.body.customIngredientsPrice;
      if (req.body.price !== undefined) updateData.price = req.body.price;
      
      const updated = await Cart.findOneAndUpdate({ _id: req.params.id, userId: req.user.id }, updateData, { new: true });
      if (!updated) return res.status(404).send('Not found');
      res.json(updated);
    } catch (err) { handleErrors(res, err); }
  }
);

// Delete an item from shopping cart (auth required)
router.delete('/cart/:id', auth, async (req, res) => {
  try {
    const deleted = await Cart.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).send('Not found');
    res.sendStatus(204);
  } catch (err) { handleErrors(res, err); }
});

module.exports = router;