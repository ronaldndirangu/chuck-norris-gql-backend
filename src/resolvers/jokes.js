import axios from 'axios';
import { AuthenticationError } from 'apollo-server-express';

export default {
  Query: {
    categories: async (root, args, context, info) => {
      if (context.isAuthenticated) {
        const response = await axios.get('https://api.chucknorris.io/jokes/categories');
        return response.data;
      }
      return new AuthenticationError('Authentication error invalid/Missing token');
    },
    joke: async (root, args, context, info) => {
      if (context.isAuthenticated) {
        const response = await axios.get(`https://api.chucknorris.io/jokes/random?category=${args.category}`);
        return response.data;
      }
      return new AuthenticationError('Authentication error invalid/Missing token');
    }
  }
};
