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
    type: Date
  },
  totalAmount: {
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
  partialAmount: {
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