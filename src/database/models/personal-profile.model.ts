import mongoose from 'mongoose';
import ConsumedMealsHistoryDay from './consumed-meals-history-day.model';
import DietPlanDay from './diet-plan-day.model';

const personalProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Person'
  },
  dailyKilocalorieIntake: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

personalProfileSchema.virtual('consumedMealsHistory', {
  ref: 'ConsumedMealsHistoryDay',
  localField: '_id',
  foreignField: 'profile'
});

personalProfileSchema.virtual('dietPlan', {
  ref: 'DietPlanDay',
  localField: '_id',
  foreignField: 'profile'
});

personalProfileSchema.methods.toJSON = function() {
  const personalProfileObject = this.toObject() as any;
  const fieldsToDelete = ['createdAt', 'updatedAt', '__v'];

  fieldsToDelete.forEach(field => delete personalProfileObject[field]);

  return personalProfileObject;
};

personalProfileSchema.pre('remove', async function (next) {
  await ConsumedMealsHistoryDay.deleteMany({profile: this._id});
  await DietPlanDay.deleteMany({profile: this._id});

  next();
});

const PersonalProfile = mongoose.model('PersonalProfile', personalProfileSchema);
export default PersonalProfile;