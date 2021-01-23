import mongoose from 'mongoose';
import { Currency } from '../types/enums/currency.enum';

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
    value: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: Currency,
      required: true
    }
  },
  sizeInUnits: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

productOfferSchema.methods.toJSON = function() {
  const productOfferObject = this.toObject() as any;
  const fieldsToDelete = ['maintainer', 'createdAt', 'updatedAt', '__v'];

  fieldsToDelete.forEach(field => delete productOfferObject[field]);

  return productOfferObject;
};

const ProductOffer = mongoose.model('ProductOffer', productOfferSchema);
export default ProductOffer;