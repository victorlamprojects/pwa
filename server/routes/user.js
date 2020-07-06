const router = require('express').Router();
const bcrypt = require('bcrypt');
const saltRounds = 12;
let User = require('../models/user.model');

//Search user info by user id
//If not given id or cannot find the user, return {}
router.route('/').get((req, res)=>{
	userID = req.user._id;
	User.findById(userID, '-password', (err, user)=>{
		foundUser = {};
		if(!user){
			foundUser = {};
		}
		else{
			foundUser= user;
		}
		res.json(foundUser);
	});
})

//Update a user's info
router.route('/update').post((req, res)=>{
	let query = {_id: req.user._id};
	let user = {
		name: req.body.name,
		email: req.body.email
	}
	if(req.body.password != null){
		user.password = req.body.password;
	}
	User.findOneAndUpdate(query, user, (err, user)=>{
		if(err){
			res.json('Error occurs while updating user information.');
		}
		else{
			res.json('Update successfully.');
		}
	},{useFindAndModify: false});
});


module.exports = router;