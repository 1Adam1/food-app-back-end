import mongoose from 'mongoose';

const personalProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  person: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Person'
  },
  dailyCalorieIntake: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const PersonalProfile = mongoose.model('User', personalProfileSchema);
export default PersonalProfile;