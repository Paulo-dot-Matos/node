
const _ = require('lodash')
const Joi = require('joi');
const bcrypt = require('bcrypt');
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    //verify if user is already register
    let user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Invalid email or password');
  
    // validate password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password');

    // create client token
   const token = {
     token: user.generateAuthToken()
   }
    res.send(token);
  
  });

  function validate(req) {
    const schema = {
        email: Joi.string().required().email(),
        // we have joi password complexity to validate a password
        password: Joi.string().required()
    }


   return Joi.validate(req,schema) 
}

  module.exports = router;