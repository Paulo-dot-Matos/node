const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 255,
        unique: true 
    },
    password: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){ // the this keyWord doesnt work with ()=>{}
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User',userSchema);


function validateUser(user) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        // we have joi password complexity to validate a password
        password: Joi.string().min(5).max(1024).required()
    }

   return Joi.validate(user,schema) 
}

exports.User = User
exports.validate = validateUser