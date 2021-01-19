import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  maintainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

shopSchema.virtual('productOffers', {
  ref: 'ProductOffer',
  localField: '_id',
  foreignField: 'shop'
});

const Shop = mongoose.model('Shop', shopSchema);
export default Shop;