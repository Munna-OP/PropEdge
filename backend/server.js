require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors());

connectDB(process.env.MONGO_URI);

// Static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/properties', require('./routes/properties'));
app.use('/api/portal', require('./routes/portal'));
app.use('/api/seller-request', require('./routes/seller-request'));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve public agent landing page directly (so /agent works)
app.get('/agent', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/agent.html'));
});

// Fallback to index.html for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
