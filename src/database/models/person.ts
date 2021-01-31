import mongoose from 'mongoose';
import { Gender } from '../../types/enums/gender.enum';
import PersonalProfile from './personal-profile';

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

personSchema.methods.toJSON = function() {
  const personObject = this.toObject() as any;
  const fieldsToDelete = ['maintainer', 'createdAt', 'updatedAt', '__v'];

  fieldsToDelete.forEach(field => delete personObject[field]);

  return personObject;
};

personSchema.pre('remove', async function (next) {
  await PersonalProfile.deleteMany({person: this._id});

  next();
});

const Person = mongoose.model('Person', personSchema);
export default Person;