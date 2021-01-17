import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  description: {
    type: String
  },
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
});

personSchema.virtual('profiles', {
  ref: 'PersonalProfile',
  localField: '_id',
  foreignField: 'person'
});

const Person = mongoose.model('Person', personSchema);
export default Person;