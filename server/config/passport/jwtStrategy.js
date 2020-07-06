import jwtSecret from '../jwtConfig';
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../../models/user.model.js');
// let cookieExtractor = (req) => {
//   let token = null;
//   if (req && req.cookies) token = req.cookies['jwt'];
//   return token;
// };

const opts = {
	jwtFromRequest: req => req.cookies.jwt,//cookieExtractor,
	secretOrKey: jwtSecret.secret
};


passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done)=> {
		User.findById(jwt_payload._id)
	    .then(user => {
	    	if(!user)
	    		console.log("user not found!");
	    	done(null, user);
	    })
	    .catch(err => done(err))
    })
);