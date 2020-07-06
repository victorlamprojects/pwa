const passport = require('passport');
require('./passport/localStrategy');
require('./passport/jwtStrategy');
module.exports = passport;