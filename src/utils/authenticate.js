import jwt from 'jsonwebtoken';

const authenticate = token => {
  if (!token) return false;

  // get the user token from the headers
  const splitToken = token.split(' ')[1];
  try {
    const isAuthenticated = jwt.verify(splitToken, process.env.SECRET_KEY);
    if (isAuthenticated) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

export default authenticate;
