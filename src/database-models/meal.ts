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
    steps: [
      {
        title: {
          type: String,
          trim: true,
          required: true
        },
        description: {
          type: String,
          required: true,
          trim: true
        }
      }
    ],
    details: {
      description: {
        type: String,
        trim: true
      },
      complexity: {
        type: String,
        trim: true
      },
      time: {
        type: String,
        trim: true
      }
    }
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
