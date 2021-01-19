import mongoose from 'mongoose';

const dietPlanDaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    trim: true
  },
  mealTimes: [
    {
      time: {
        type: Date,
        required: true
      },
      portion: {
        percentSize: {
          type: Number,
          required: true,
          min: 0
        },
        meal: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Meal',
          required: true
        },
        required: true
      }
    }
  ],
  totalKilocaloriesConsumption: {
    type: Number,
    required: true,
    min: 0
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalProfile',
    required: true
  }
}, {
  timestamps: true
});

const DietPlanDay = mongoose.model('DietPlanDay', dietPlanDaySchema);
export default DietPlanDay;