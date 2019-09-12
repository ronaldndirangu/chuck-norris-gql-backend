import Joi from 'joi';

export default Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required().label('Email'),
  username: Joi.string().alphanum().min(4).max(30).required().label('Username'),
  name: Joi.string().min(4).max(30).required().label('Name'),
  password: Joi.string().min(8).max(30)
    .regex(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/).required().label('Password')
    .error(() => {
      return {
        message: 'Password should be atleast 8 characters, have atleast one digit, one lowecase and one uppercase'
      };
    })
});

export const signInSchema = Joi.object().keys({
  email: Joi.string().email({ minDomainAtoms: 2 }).required().label('Email'),
  password: Joi.string().min(8).max(30)
    .regex(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/).required().label('Password')
    .error(() => {
      return {
        message: 'Password should be atleast 8 characters, have atleast one digit, one lowecase and one uppercase'
      };
    })
});
