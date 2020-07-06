const passport = require('passport');
import jwtSecret from '../config/jwtConfig';
const jwt = require('jsonwebtoken');

module.exports = function(req, res) {
	let user = JSON.parse(JSON.stringify(req.user));
	// Store id, name and email only
	const payload = {
	  	id: user._id,
	  	username: user.username
	};
	//sign a token for authentication
  	const token = jwt.sign(payload, jwtSecret.secret, { algorithm: 'HS256', expiresIn: "3h"});
  	//send the token to user
  	res.cookie('jwt', token, {secure: true, maxAge: '3600000', httpOnly: true});
  	res.status(200).send({ auth: true });
};

