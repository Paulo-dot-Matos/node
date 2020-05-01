const express = require('express');
const Joi = require('joi');
const app = express();
const logger = require('./logger')
app.use(express.json());
app.use(express.urlencoded({extended: true})); //key=value&key=value...
app.use(express.static('public')); //static assets: css, images etc.. go now inside our folder 'public'
app.use(logger); // use custom middleware
// we can create middle ware function to put on the req...res pipeline process
// express is nothin more then pipeline middleware between req and res.
app.use(function(req,res,next){ // the next function is mandatory to give continuity to the pipeline flow
    console.log('authenticating...' );
    next();
});

const courses = [
    {id: 1, name:"course1"},
    {id: 2, name:"course2"},
    {id: 3, name:"course3"}
]

app.get('/', (req, res) =>{
    res.send('Hello world!');
}); //get(<endpoint>,<callbackFunction> or route handler)



app.get('/api/courses', (req, res) =>{
    res.send(courses);
});

//  GET  a single course

app.get('/api/courses/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the id was not found");// 404 object not found.
    res.send(course);

});

app.get('/api/courses/:year/:month', (req, res) =>{
    res.send(req.params);
});

// ROUTE PARAMETERS FOR ESSECIAL DATA THAT NEED TO BE SENT
// QUERY PARAMETERS FOR OPTIONAL PARAMETER
app.get('/api/courses/:year/:month', (req, res) =>{//api/courses/:year/:month/?NAME=ASDASD
    res.send(req.query);
});

app.post('/api/courses', (req,res) => {

    const { error } = validateCourse(req.body); // object destructuer. we hant result.error, like this we only have to put error.
   
    if(error) return res.status(400).send(error.details[0].message);
    
    let course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


app.put('/api/courses/:id', (req,res) => {
    // look up course
    // If doessn exist throw 404.
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("The course with the id was not found");
        return; 
    }
    //Validate
    // If invalida throw 400
    const { error } = validateCourse(req.body); // object destructuer. we hant result.error, like this we only have to put error.
    if(error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    //Update course
    //Return updated coure
    course.name = req.body.name;
    res.send(course); 

});

function validateCourse(course){
    const schema = {
        name: Joi.string().min(3).required()
    }
   return Joi.validate(course, schema);
};

app.delete('/api/courses/:id', (req,res) => {
    // look the course
    // If doesn exist throw 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the id was not found");
    //Delete
    courses.splice(courses.indexOf(course),1);
    //Return same course
    res.send(course);
});


// PORT --environment variable that the value is set outside.
// powershell commnad -> $env:PORT = 5000
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


