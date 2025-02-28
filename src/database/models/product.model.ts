import mongoose from 'mongoose';
import { Unit } from '../../types/enums/unit.enum';
import { ProductDataModelInterface } from '../interfaces/product.model.interface';
import ProductOffer from './product-offer.model';

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
  defaultUnit: {
    type: Unit,
    required: true
  },
  kilocaloriesPerUnit: {
    type: Number,
    required: true,
    min: 0
  },
  maintainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

productSchema.pre('remove', async function (next) {
  await ProductOffer.deleteMany({shop: this._id});

  next();
});

productSchema.virtual('offers', {
  ref: 'ProductOffer',
  localField: '_id',
  foreignField: 'product'
});

productSchema.methods.toJSON = function() {
  const productObject = this.toObject() as any;
  const fieldsToDelete = ['maintainer', 'createdAt', 'updatedAt', '__v'];

  fieldsToDelete.forEach(field => delete productObject[field]);

  return productObject;
};

const Product = mongoose.model<ProductDataModelInterface>('Product', productSchema);
export default Product;