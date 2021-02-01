import mongoose from 'mongoose';
import { Currency } from '../../types/enums/currency.enum';

const shoppingListSchema = new mongoose.Schema({
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductOffer',
        required: true
      }
    }
  ],
  date: {
    type: Date,
    validate(value: Date) {
      const currentTime = new Date().getTime();
      if (value.getTime() > currentTime) {
        throw new Error('Cannot use past date');
      }
    }
  },
  description: {
    type: String,
    trim: true
  },
  totalPrice: {
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
  maintainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const ShoppingList = mongoose.model('ShoppingList', shoppingListSchema);
export default ShoppingList;