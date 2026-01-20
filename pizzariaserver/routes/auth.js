// ...new file...
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

router.post('/register',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { name, email, password } = req.body;
      if (await User.findOne({ email })) return res.status(400).json({ error: 'Email exists' });
      const hash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hash });
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
      res.status(201).json({ token, user: user.toJSON() });
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
);

router.post('/login',
  body('email').isEmail(),
  body('password').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET);
      res.json({ token, user: user.toJSON() });
    } catch (err) { res.status(500).json({ error: err.message }); }
  }
);

module.exports = router;