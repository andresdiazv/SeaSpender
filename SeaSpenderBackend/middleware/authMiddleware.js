const expressJwt = require('express-jwt');

const requireAuth = expressJwt({
  secret: 'secret', // Use the same secret as in your JWT signing.
  algorithms: ['HS256'],
  userProperty: 'auth'
});

module.exports = { requireAuth };
