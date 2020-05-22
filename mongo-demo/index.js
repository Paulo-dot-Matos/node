const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log('Connected to mongoDb...'))
.catch(err=> console.log('cannot connsect to db, ', err))


// Create a schema
const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 255
        },
        category: {
            type: String,
            required: true,
            enum: ['web','mobile','network']    
        },
        author: String,
        tags: {
            type: Array,
            // custom validator
            validate: {
                validator: function (v){
                    return v && v.length > 0 // reads: if v has a value and its length greater then 0
                },
                message: 'A course should have at least one tag.'
            }

        },
        date: {
            type: Date, default: Date.now
        },
        isPublished: Boolean,
        price: {
            type: Number,
            required: function(){return this.isPublished},
            min: 10,
            max: 200
        }
    }
)

// Create a model
const Course = mongoose.model('Course', courseSchema)

// save
async function createCourse(){
   
    const course = new Course({
        name:'.net course',
        author: 'Paulo',
        category:'web',
        tags:['frontend'],
        isPublished: true,
        price: 15
    })

    // validade manually
    // course.validate()
    try{
        const result = await course.save();
        console.log(result)
    } catch(ex){    
        
        for (field in ex.errors)
            console.log(ex.errors[field].message)
    }
    
}

createCourse()










//get
async function getCourses(){
    const pageNumber = 2
    const pageSize = 1

    const courses = await Course.find({author: 'Paulo', isPublished: true})
    .limit(10)
    .sort({name:1})
    //pagination methods
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize)
    .select(({name: 1, tags: 1}))
   //.count()
    console.log(courses)
}

// get with operators
async function getCoursesWithOperatrs(){
    const courses = await Course
    .find({price: {$gt: 10, $lte: 20}}) // obecto k expressa um conceito.
    .find({price: {$in: [10,20,30]}})
    .limit(10)
   .select(({name: 1, tags: 1}))
 .count()
    console.log(courses)
}

async function updateCourse(id){
    // Approach: Query firsts -> find by id modify and save again.
    
    const course = await Course.findById(id)
    console.log(`course is: ${course}`);
    if(!course) return;
    course.isPublished = true;
    course.author = "Paulo author";

    const result = await course.save();
    console.log(result);
};

//updateCourse('5ec2921b86933f0bd06ea46f')

async function updateFirstCourse(id){
// Approach: Update first -> update directly

    
const result = await Course.update({_id: id},{
    // now we use mongo db update operators
    $set: {
        author: 'Ricardo',
        isPublished: false
    }
})
console.log(result);
};



//updateFirstCourse('5ec292d5c08685568838fdb9');

// delete
async function removeCourse(id){
    const result = await Course.deleteOne({_id: id})
    console.log(result)
}

removeCourse('5ec292d5c08685568838fdb9')
//getCourses();

// cCOMPARISON OEPRATORS
/*
eq
ne
gt
gte
lt
lte
in
nin
*/
//Logical oeprators
/*
or
and
*/
/*
async function getCourses(){
    const courses = await Course
    .find()
    .or([{author: 'Paulo'}, {isPublished: true}])
    .limit(10)
    .sort({name:1})
    .select(({name: 1, tags: 1}))
    console.log(courses)
}
*/
//Regular expression
/*
async function getCourses(){
    const courses = await Course
    //stars with mosh
    .find({author: /^Mosh/})
    // end with matos
    .find({author: /matos$/i}) the i makes it case incensitive
    // contains paulo
    */
    //.find({author: /.*Paulo.*/})
    /*
    .limit(10)
    .sort({name:1})
    .select(({name: 1, tags: 1}))
    console.log(courses)
}
*/














