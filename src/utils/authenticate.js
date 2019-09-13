import jwt from 'jsonwebtoken';

const authenticate = token => {
  if (!token) return false;

  // get the user token from the headers
  try {
    const isAuthenticated = jwt.verify(token, process.env.SECRET_KEY);
    if (isAuthenticated) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

export default authenticate;
