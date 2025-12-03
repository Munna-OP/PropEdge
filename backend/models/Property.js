const mongoose = require('mongoose');
const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  areaSqFt: Number,
  type: { type: String, enum: ['sale','rent'], default: 'sale' },
  address: String,
  location: {
    // GeoJSON Point
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0,0] } // [lng, lat]
  },
  images: [String],
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});
PropertySchema.index({ location: '2dsphere' });
module.exports = mongoose.model('Property', PropertySchema);
