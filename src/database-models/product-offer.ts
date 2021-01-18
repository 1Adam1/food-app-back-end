import mongoose from 'mongoose';
import { Currency } from '../types/enums/currency.enum';

const PriceSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: Currency,
    required: true
  }
});

const productOfferSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
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
    type: PriceSchema,
    required: true,
    min: 0
  },
  sizeInUnits: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

const ProductOffer = mongoose.model('ProductOffer', productOfferSchema);
export default ProductOffer;