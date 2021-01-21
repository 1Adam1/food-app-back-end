import mongoose from 'mongoose';
import { PasswordHashingService } from '../services/authentication/password-hashing.service';
import { UserData } from '../types/interfaces/user-data.interface';
import { UserDataModelInterface } from './interfaces/user-data.model.interface';

const userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  surname: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
});

userSchema.virtual('people', {
  ref: 'Person',
  localField: '_id',
  foreignField: 'maintainer'
});

userSchema.virtual('meals', {
  ref: 'Meal',
  localField: '_id',
  foreignField: 'maintainer'
});

userSchema.virtual('shoppingLists', {
  ref: 'ShoppingList',
  localField: '_id',
  foreignField: 'maintainer'
});

userSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'maintainer'
});

userSchema.virtual('Shops', {
  ref: 'Shop',
  localField: '_id',
  foreignField: 'maintainer'
});

userSchema.pre('save', async function (next) {
  const user: mongoose.Document = this;

  if (user.isModified('password')) {
    user.set('password', await PasswordHashingService.hashPassword(user.get('password')));
  }

  next();
});

userSchema.methods.toJSON = function() {
  const userObject = this.toObject() as any;
  const fieldsToDelete = ['password', 'tokens', 'avatar', 'createdAt', 'updatedAt', '__v'];

  fieldsToDelete.forEach(field => delete userObject[field]);

  return userObject;
}

const User = mongoose.model<UserDataModelInterface>('User', userSchema);

export default User;