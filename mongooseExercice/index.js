const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/mongo-exercises')
.then(()=>console.log('Connected to mongoDb...'))
.catch(err=> console.log('cannot connsect to db, ', err))

//ex 1

// Create a schema
const courseSchema = new mongoose.Schema(
    {
        name: String,
        author: String,
        tags: [String],
        date: Date,
        isPublished: Boolean,
        price: Number
    }
)

// Create a model
const Course = mongoose.model('Course', courseSchema)

//get course for backend that are publised order them by name and select only name and author
async function getCourses1(){

    const courses = await Course.find({isPublished: true, tags: 'backend'})
    .sort({name: 1})
    .select({name:1, author:1})
    console.log(courses)
}




// get all published frontend and backend, sort them by price in descending order
// pick name and author
async function getCourses2(){

    const courses = await Course.find({isPublished: true, tags: {$in: ['frontend','backend']}})
    .sort({price: -1})
    .select({name:1, author:1, price:1})
    console.log(courses)
}



// get all  published courser worth 15 or more and have the word 'by' in the title
async function getCourses3(){

    const courses = await Course.find({isPublished: true})
    .or([{price: {$gte: 15}},{name: /.*by.*/i}])
    .select({name:1, author:1, price:1})
    console.log(courses)
}

getCourses3();
