/* eslint-disable */

const mongoose = require('mongoose');
// para incriptar
const bcryptjs = require('bcryptjs');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    //role: String,
    password: String
})

const User = mongoose.model('User', UserSchema);
module.exports = User;

// funcion para cifrar la contrase;a 
//genSalt para convertir una contraseña en una cadena cifrada
module.exports.createUser = (newUser, callback) =>{
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(newUser.password, salt, (err, hash) =>{
            
            // store the hashed passeord
            const newUserResource = newUser;
            newUserResource.password = hash;
            newUserResource.save(callback)
        } )

    })
}

module.exports.getUserByEmail = (email, callback) =>{
    const query = {email};
    User.findOne(query, callback)
}

module.exports.comparePassword = (candidatePassword, hash, callback) =>{
     bcryptjs.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
     })
}








