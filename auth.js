const jwtSecret = 'your_jwt_secret'; //Same key as used in the JWTStrategy in Passport.js file

const jwt = require('jsonwebtoken'),
  passport = require('passport');

require('./passport');

//Create Token
let generateJWTToken = user => {
  return jwt.sign(user, jwtSecret, {
    subject: user.Username, //Username encoded in the JWT
    expiresIn: '7d',
    algorithm: 'HS256'
  });
};

/*POST Login*/
module.exports = router => {
  router.post('/login', (req, res) => {
    passport.authenticate('local', { session: false }, (error, user, info) => {
      if (error || !user) {
        return res
          .status(400)
          .json({ message: 'Something is not right', user: user });
      }

      req.login(user, { session: false }, error => {
        if (error) {
          res.send(error);
        }
        let Token = generateJWTToken(user.toJSON());
        return res.json({ user, Token });
      });
    })(req, res);
  });
};
