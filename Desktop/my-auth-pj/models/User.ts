import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },

  //whenever we are protectiong our routes we'll need this

  role: {
    type: String,
    default: 'user',
  },
  image: {
    type: String,
  },

  //this will be coming from the auth provider like google, github etc.
  authProviderId: {
    type: String,
  },
});

export const User = mongoose.models?.User || mongoose.model('User', userSchema);
