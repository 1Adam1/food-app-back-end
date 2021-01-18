import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  ingredients: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      size: {
        type: Number,
        required: true,
        min: 0
      }
    }
  ],
  recipe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe'
  },
  totalKilocalories: {
    type: Number,
    required: true,
    min: 0
  },
  mainteiner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
},{
  timestamps: true
});

const Meal = mongoose.model('Meal', mealSchema);
export default Meal;
