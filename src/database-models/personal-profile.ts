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

const PersonalProfile = mongoose.model('PersonalProfile', personalProfileSchema);
export default PersonalProfile;