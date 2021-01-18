import mongoose from 'mongoose';
import { Gender } from '../types/enums/gender.enum';

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    trim: true
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: Gender
  },
  description: {
    type: String,
    trim: true
  },
  avatar: {
    type: Buffer
  },
  maintainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
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