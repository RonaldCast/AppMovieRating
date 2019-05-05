/* eslint-disable */
const config = require('./config/Config')
const session = require('express-session')

// para el historial de la rutas 
const history = require('connect-history-api-fallback')

const express = require('express');
//jsonwebtoken, passport y
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const app = express();
const router = express.Router();

// para transformar en un servidor estatico 
const serveStatic = require('serve-static')

//configuracion de la extrategia 
//Necesitaremos JwtStrategy de passport.js, y ExtractJwT
// se usará para extraer los datos de carga útil en el token jwt
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {};
//para establcer la configuracion de autentificacion
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secreteOrKey = 'movieratingapplicationsecretkey'


//nos permite acceder a las rutas directamente
app.use(history())

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors({
    'Access-Control-Allow-Origin': '*'
}));

//configuracion de a sesion. 
app.use(session ({
    secret: config.SECRETE,
    resave: true,
    saveUninitialized: true,
    cookie: {httpOnly: false}
}))
//usando passport inicializado 
app.use(passport.initialize());
app.use(passport.session())

//mongodb://localhost/movie_rating_app
mongoose.connect(config.DB, {
    useNewUrlParser: true
})
.then(db => console.log("DB is connected"))
.catch(err => {
    console.error('App starting error:', err.stack);
    process.exit(1);
})


//include controllers
fs.readdirSync("controllers").forEach(function(file){
    if(file.substr(-3) == ".js"){
        const route = require("./controllers/" + file)
        route.controller(app)
    }
})

//para configurar el serverStatic
//esta comando crear los archivos estaticos denteo de la carpeta dist 
//en la aplicacion que recibira el servidor 
//entonces la aplicacione va a correr por un puerto. 
app.use(serveStatic(__dirname + "/dist"))


//ruta con session para obtener el usuario actual registrado 
router.get('/api/current_user', isLoggedIn, (req, res) => {
    if(req.user){
        res.send({current_user: req.user})
    }else{
        res.status(403).send({seccess: false, msg: 'Unauthorized.'});
    }
})
// funcion para inicisar sesion
// y obtener los datos del usuario
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }

    res.redirect('/')
    console.log('erro! auth failed')
}

// ruta para salir de la sesion
router.get('/api/logout', (req, res) => {
    req.logout();
    res.send();
})

//ruta ordinaria 
router.get('/', (req, res) => {
  res.json({
    message: 'API Initalized'
  });
});
 

const port = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(port, function() {
    console.log(`api running on port ${port}`, "http://localhost:8081")
})
