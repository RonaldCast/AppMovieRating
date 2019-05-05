/* eslint-disable */

//confifurando el registro con facebook 

const User = require('../models/User.js')
const chalk = require('chalk')
const passport = require('passport')
const config = require('../config/Config')
 const FacebookStrategy = require('passport-facebook').Strategy

module.exports.controller = (app) => {
    //facebook strategy


   
    passport.use(new FacebookStrategy({
        clientID: config.FACEBOOK_APP_ID,
        clientSecret: config.FACEBOOK_APP_SECRET,
        callbackURL: 'http://localhost:8081/login/facebook/callback', //en la url que se desea enrutar despues de la llamada con facebook 
        profileFields:['id', 'displayName', 'email']

    },
    function (accesToken, refreshToken, profile, cb) {
        const email = profile.emails[0].value;
        User.getUserByEmail(email, (err, user) => {
            if(!user){
                const newUser = new User({
                    name: profile.displayName,
                    email,
                    facebookId: profile.id,
                })

                User.createUser(newUser, (error) =>{
                    if(error){
                        //Handle error
                    }
                    return cb(null, user)
                })
            }else{
                return cb(null, user);
            }
            return true;
        })
    }))

    app.get('/login/facebook',
        passport.authenticate('facebook', { scope: ['email'] }), (req, res) =>{
             res.header("Access-Control-Allow-Origin", "*");
        })

    app.get('/login/facebook/callback',
        passport.authenticate('facebook',
         { failureRedirect: '/login',
            successRedirect: '/'
        }), // ruta a al cual se va a redireccionar
     (req, res) => {
        
        res.redirect('/')
    })
}