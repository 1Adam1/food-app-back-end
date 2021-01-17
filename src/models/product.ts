import mongoose from 'mongoose';
import {Unit} from '../types/enums/unit.enum';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true 
  },
  unit: {
    type: Unit,
    required: true
  },
  calories: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true
});

productSchema.virtual('offerts', {
  ref: 'ProductOffer',
  localField: '_id',
  foreignField: 'product'
});

const Product = mongoose.model('Product', productSchema);