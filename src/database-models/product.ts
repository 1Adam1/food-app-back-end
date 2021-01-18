import mongoose from 'mongoose';
import { Unit } from '../types/enums/unit.enum';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  unit: {
    type: Unit,
    required: true
  },
  kilocaloriesPerUnit: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

productSchema.virtual('offers', {
  ref: 'ProductOffer',
  localField: '_id',
  foreignField: 'product'
});

const Product = mongoose.model('Product', productSchema);
export default Product;