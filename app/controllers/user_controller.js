import jwt from 'jwt-simple';
import config from 'react';

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
  const user = new User();
  user.email = req.body.email;
  user.password = req.body.password;
  user.save()
  .then(result => {
    res.json({ message: 'User created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};
