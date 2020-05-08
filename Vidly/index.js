const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const genres = [
    {id: 1, name: 'terror'},
    {id: 2, name: 'romance'},
    {id: 3, name: 'action'}
]

app.get('api/genres', (req, res) => {
    app.send(genres);
});




