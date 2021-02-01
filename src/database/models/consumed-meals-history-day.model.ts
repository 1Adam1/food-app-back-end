import mongoose from 'mongoose';

const consumedMealsHistoryDaySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    validate(value: Date) {
      const currentTime = new Date().getTime();
      if (value.getTime() > currentTime) {
        throw new Error('Cannot use future date');
      }
    }
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
        }
      }
    }
  ],
  totalKilocaloriesConsumption: {
    type: Number,
    required: true,
    min: 0
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PersonalProfile',
    required: true
  }
}, {
  timestamps: true
});

consumedMealsHistoryDaySchema.methods.toJSON = function() {
  const consumedMealsHistoryDayObject = this.toObject() as any;
  const fieldsToDelete = ['createdAt', 'updatedAt', '__v'];

  fieldsToDelete.forEach(field => delete consumedMealsHistoryDayObject[field]);

  return consumedMealsHistoryDayObject;
};

const ConsumedMealsHistoryDay = mongoose.model('ConsumedMealsHistoryDay', consumedMealsHistoryDaySchema);
export default ConsumedMealsHistoryDay;
