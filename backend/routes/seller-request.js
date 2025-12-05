const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// POST seller request (no auth required for initial request)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, propertyType, propertyAddress, propertyDescription, expectedPrice } = req.body;

    // Validation
    if (!name || !email || !phone || !propertyAddress || !propertyDescription || !expectedPrice) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Phone validation (10 digits)
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // In a real app, you'd save this to a database
    // For now, log it to console
    console.log('Seller Request Received:', {
      name,
      email,
      phone,
      propertyType,
      propertyAddress,
      propertyDescription,
      expectedPrice,
      timestamp: new Date()
    });

    res.status(200).json({
      message: 'Seller request submitted successfully',
      data: {
        name,
        email,
        phone,
        propertyType
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
