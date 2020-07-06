const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		maxlength: 20
	},
	password: {
		type: String,
		required: true
	},
	name:{
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	}
},{
	timestamps: true
});

userSchema.methods.checkPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;