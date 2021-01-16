import mongoose from 'mongoose';

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
    required: false,
    trim: true,
  },
  tokens: [
    {
      type: String,
      required: true
    }
  ],
  avatar: {
    type: Buffer
  }
});