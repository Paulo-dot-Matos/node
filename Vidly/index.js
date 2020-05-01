const express = require('express');
const app = express();
app.use(express.json());

const genres = [
    {id: 1, name: 'terror'},
    {id: 2, name: 'romance'},
    {id: 3, name: 'action'}
]


