/* eslint-disable */

const User = require("../models/User");
//const config = require('./../config/confing');
const passport = require('passport');

//requeriendo la estrategia local 
const LocalStrategy = require('passport-local').Strategy;

// configuracion para que el usuario inicie sesion

const passwordJWT = require('passport-jwt')
const jwt = require('jsonwebtoken')

const ExtractJwt = passwordJWT.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
jwtOptions.secreteOrKey = 'thisisthesecretkey'

module.exports.controller = (app) => {
//loca strategy: configuracion 
passport.use(new LocalStrategy ({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => {
     
    User.getUserByEmail(email, (err, user) => {
        if(err){
            return done(err)
        }
        if(!user){
            return done(null, user)
        }
        User.comparePassword(password, user.password, (error, isMatch) => {
            if(isMatch){
                return done(null, user)
            }
            return done(null, false)

        });
        return true;
    })
}))

// login user
app.post('/users/login', passport.authenticate('local', {failureRedirect: 'users/login'}), (req, res) => {
    res.redirect('/')
})

passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
});
 


app.post('/users/register', (req, res) => {
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    console.log('sdsdsd')
    const newUser = new User({
        name,
        email,
        password,
        //role
    });

    User.createUser(newUser, (error, user) => {
        if (error){
            // para monstrar un mensaje segun la respuesta del servidor
            res.status(422).json({
                messaje: 'Something went wrong. please try again after some'
            })
         
        }
        res.send({user});
    })
})

//login a user 


//login a user 
/*
    app.post('/users/login', (req, res) => {
        if(req.body.email && req.body.password){
            const password = req.body.password
            const email = req.body.email
            User.getUserByEmail(email, (err, user) =>{
                if(!user){
                    res.status(404).json({
                        message: 'The user does not exist!'
                    })
                }else{
                    User.comparePassword(password, user.password, (error, isMatch) =>{
                        if(error) throw error
                        if(isMatch){
                            const payload =  {id: user.id}
                            const token = jwt.sign(payload, jwtOptions.secreteOrKey)
                            res.json({message: 'ok', token});

                        }else{
                            res.status(401).json({message: 'The password is incorrect!'})
                        }
                    })
                }
            })
        }
    })*/

}

















