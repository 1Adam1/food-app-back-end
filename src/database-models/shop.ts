import mongoose from 'mongoose';
import { ShopDataModelInterface } from './interfaces/shop.model.interface';
import ProductOffer from './product-offer';

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

shopSchema.pre('remove', async function (next) {
  await ProductOffer.deleteMany({shop: this._id});

  next();
});

shopSchema.methods.toJSON = function() {
  const shopObject = this.toObject() as any;
  const fieldsToDelete = ['maintainer', 'createdAt', 'updatedAt', '__v'];

  fieldsToDelete.forEach(field => delete shopObject[field]);

  return shopObject;
};

const Shop = mongoose.model<ShopDataModelInterface>('Shop', shopSchema);
export default Shop;