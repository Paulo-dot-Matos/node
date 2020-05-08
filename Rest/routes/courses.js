const express = require('express');
const router = express.Router();



const courses = [
    {id: 1, name:"course1"},
    {id: 2, name:"course2"},
    {id: 3, name:"course3"}
]

router.get('/', (req, res) =>{
    res.send(courses);
});

//  GET  a single course



router.get('/:id', (req, res) =>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the id was not found");// 404 object not found.
    res.send(course);

});

router.get('/api/courses/:year/:month', (req, res) =>{
    res.send(req.params);
});

// ROUTE PARAMETERS FOR ESSECIAL DATA THAT NEED TO BE SENT
// QUERY PARAMETERS FOR OPTIONAL PARAMETER
router.get('/:year/:month', (req, res) =>{//api/courses/:year/:month/?NAME=ASDASD
    res.send(req.query);
});

router.post('/', (req,res) => {

    const { error } = validateCourse(req.body); // object destructuer. we hant result.error, like this we only have to put error.
   
    if(error) return res.status(400).send(error.details[0].message);
    
    let course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});


router.put('/:id', (req,res) => {
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

router.delete('/:id', (req,res) => {
    // look the course
    // If doesn exist throw 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("The course with the id was not found");
    //Delete
    courses.splice(courses.indexOf(course),1);
    //Return same course
    res.send(course);
});

module.exports = router;