const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define a schema and model for GMCHolcim
const gmchSchema = new mongoose.Schema({}, { strict: false }); // Flexible schema
const GMCHolcim = mongoose.model('GMCHolcim', gmchSchema, 'GMCHolcim'); // Third param is collection name

// API route to fetch data
app.get('/', async (req, res) => {
  try {
    const data = await GMCHolcim.find().limit(10); // Limit to 10 for testing
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));