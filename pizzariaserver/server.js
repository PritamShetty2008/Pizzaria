const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const pizzeriaRoutes = require('./routes/pizzeriaRoutes');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGO_URI;
mongoose.connect(mongoUri) // removed deprecated options
  .then(() => console.log("Connected to PIZZARIADB via .env"))
  .catch(err => {
    console.error("Database connection error:", err);
    process.exit(1);
  });

app.use('/api/auth', authRoutes);
app.use('/api', pizzeriaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));