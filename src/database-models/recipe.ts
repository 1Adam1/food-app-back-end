import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
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
}, {
  timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;