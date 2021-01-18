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
  totalKiloCalories: {
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

// date: Date;
//   description: string;
//   mealTimes: MealTime[];
//   totalKiloCalories: number; 