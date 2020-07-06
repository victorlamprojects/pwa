const express = require('express');
const path = require("path");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const passport = require('./config/passport');
const userRouter = require('./routes/user');
const app = express();
const port = process.env.PORT || 3000;
let helmet = require('helmet');

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
	console.log("MongoDB connection established successfully.");
}).on('error', (err)=>{
	console.log('Error occurs while connecting to database...');
});

const auth = require('./routes/auth');
app.use('/api/user', passport.authenticate('jwt', { session: false }), userRouter);
app.post('/api/signin', passport.authenticate('signin', { session: false }), auth);
app.post('/api/signup', passport.authenticate('signup', { session: false }), auth);
app.get('/api/checkToken', passport.authenticate('jwt', { session: false }), function(req, res) {
 	res.sendStatus(200);
});

if (process.env.NODE_ENV === 'production') {
  	app.use(express.static('../client/build'));
	// any routes not picked up by the server api will be handled by the react router
	app.use('/*', (req, res)=>{
		res.sendFile(path.join(__dirname, '../client/build/index.html'));
	});
}

app.listen(port, ()=>{
	console.log(`Server is running on port ${port}...`);
});