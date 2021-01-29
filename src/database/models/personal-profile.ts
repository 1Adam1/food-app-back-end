import mongoose from 'mongoose';

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

const PersonalProfile = mongoose.model('PersonalProfile', personalProfileSchema);
export default PersonalProfile;