import User from '../models/user';
import { UserInputError } from 'apollo-server-express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Joi from 'joi';
import userSchema, { signInSchema } from '../schemas/user';
import { generateToken } from '../utils';
import { UserError, AuthError } from '../utils/errors';

export default {
  Query: {
    users: (root, args, context, info) => {
      return User.find({});
    },
    user: (root, args, context, info) => {
      if (!mongoose.Types.ObjectId.isValid(args.id)) {
        throw new UserInputError(`${args.id} is not a valid user id`);
      }

      return User.findById(args.id);
    }
  },
  Mutation: {
    signUp: async (root, args, context, info) => {
      await Joi.validate(args, userSchema, { abortEarly: false });
      const user = await User.create(args);

      return {
        id: user.id,
        name: user.name
      };
    },
    signIn: async (root, args, context, info) => {
      await Joi.validate(args, signInSchema, { abortEarly: false });
      const user = await User.find({ email: args.email });
      if (!user.length) {
        throw new UserError({
          data: {
            key: 'email'
          },
          internalData: {
            error: 'The user email does not exist'
          }
        });
      }

      const isValid = await bcrypt.compare(args.password, user[0].password);
      if (!isValid) {
        throw new AuthError({
          data: {
            key: 'password'
          },
          internalData: {
            error: 'Wrong email or password provided'
          }
        });
      }

      const { email, username, name } = user[0];
      const token = generateToken({ email, username, name });

      return {
        token,
        name
      };
    }
  }
};
