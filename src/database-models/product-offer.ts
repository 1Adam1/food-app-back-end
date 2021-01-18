import mongoose from 'mongoose';

const productOfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Shop'
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  size: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

const ProductOffer = mongoose.model('ProductOffer', productOfferSchema);
export default ProductOffer;