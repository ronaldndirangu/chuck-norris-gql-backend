import mongoose from 'mongoose';
import { hash } from 'bcrypt';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator: async function (email) {
        return await User.where({ email }).countDocuments() === 0;
      },
      message: () => 'Email has already been taken!'
    }
  },
  username: {
    type: String,
    validate: {
      validator: async function (username) {
        return await User.where({ username }).countDocuments() === 0;
      },
      message: () => 'Username has already been taken!'
    }
  },
  name: String,
  password: String
}, {
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      this.password = await hash(this.password, 10);
    } catch (error) {
      next(error);
    }
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
