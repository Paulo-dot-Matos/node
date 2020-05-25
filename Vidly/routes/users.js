const auth = require('../middleware/auth')
const _ = require('lodash')
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// we dont use /:id because that is not safe , we take the client id from the token
router.get('/me', auth ,async(req,res)=>{
  const user = await User.findById(req.user._id).select('-password'); // select the user but exclude the password
  res.send(user);
})


router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    //verify if user is already register
    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send('User already register');
  
    user = new User(_.pick(req.body,['name','email','password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt)
    await user.save();
    
    const token = user.generateAuthToken();

    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email']));
    
  });

  module.exports = router;