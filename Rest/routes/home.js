const express = require('express');
const router = express.Router();


//ROUTE TO ROOY
router.get('/', (req, res) =>{
    res.render('index', {title: 'My express app', message: 'Hello'});
}); //get(<endpoint>,<callbackFunction> or route handler)

module.exports = router;