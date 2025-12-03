const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const upload = require('../utils/upload');
const Property = require('../models/Property');
const fetch = require('node-fetch');

// Create property (with images)
router.post('/', auth, upload.array('images', 6), async (req, res) => {
  try {
    const { title, description, price, type, address, lat, lng, areaSqFt } = req.body;
    const images = req.files ? req.files.map(f => `/uploads/${f.filename}`) : [];
    const prop = new Property({
      title, description, price, type, address,
      areaSqFt,
      seller: req.user.id,
      images,
      location: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] }
    });
    await prop.save();
    res.json(prop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get properties with optional geo filter & basic search
router.get('/', async (req, res) => {
  try {
    const { q, lng, lat, maxDistance = 5000 } = req.query;
    let filter = {};
    if (q) filter.title = new RegExp(q, 'i');
    if (lng && lat) {
      filter.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(maxDistance)
        }
      };
    }
    const props = await Property.find(filter).populate('seller', 'name email');
    res.json(props);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const prop = await Property.findById(req.params.id).populate('seller', 'name email');
    if (!prop) return res.status(404).json({ message: 'Property not found' });
    res.json(prop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
