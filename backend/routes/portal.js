const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// Example portal route that returns different data based on role
router.get('/', auth, async (req, res) => {
  try {
    const role = req.user?.role || 'guest';
    if (role === 'buyer') {
      return res.json({ portal: 'buyer', message: 'Welcome to the Buyer portal', data: { recommended: [] } });
    }
    if (role === 'seller') {
      return res.json({ portal: 'seller', message: 'Welcome to the Seller portal', data: { yourListings: [] } });
    }
    if (role === 'agent') {
      return res.json({ portal: 'agent', message: 'Welcome to the Agent portal', data: { assignedLeads: [] } });
    }
    return res.status(403).json({ message: 'Role not allowed' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
