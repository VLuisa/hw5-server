import jwt from 'jwt-simple';
import config from '../config';
import User from '../models/user_model';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

export const signin = (req, res, next) => {
  return res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }
  // Check if user already exists with that email
  // If user exists then return an error
  User.findOne({ email })
  .then(result => {
    if (result != null) {
      res.json({ message: 'Sorry, a user already exists with that email!' });
    } else {
      // If not, create a new user

      // Create a new user
      const user = new User();
      user.email = email;
      user.password = password;
      // Save the new User object
      user.save()
      .then(res => {
        // return a token
        res.json({ token: tokenForUser(user) });
      })
      .catch(error => {
        res.json({ error });
        res.status(422).send(error.data);
      });
    }
  });
};
