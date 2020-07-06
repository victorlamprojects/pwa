const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
import bcrypt from 'bcrypt';
const BCRYPT_SALT_ROUNDS = 12;
const User = require('../../models/user.model.js');

passport.use('signin', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: false
    }, 
    (username, password, done)=> {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({username})
           .then(user => {
               if (!user) {
                   return done(null, false, {message: 'User not found!'});
               }
               if(user.checkPassword(password)){
                  return done(null, user, {message: 'Logged In Successfully'});
               }
               return done(null, false, {message: 'Incorrect username or password.'});
          })
          .catch(err => done(err, false));
    }
));
passport.use('signup', new localStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: false
    }, 
    (username, password, done)=> {
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({username})
           .then(user => {
               if (user) {
                  console.log('User already exists!');
                  return done(null, false, {message: 'User already exists!'});
               }
               else{
                  bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then((hashedPassword)=>{
                    User.create({username, passowrd: hashedPassword}).then(user=>{
                      console.log('user created');
                      return done(null, user);
                    });
                  });
               }
          })
          .catch(err => done(err, false));
    }
));