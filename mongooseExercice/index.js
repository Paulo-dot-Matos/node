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

//get
async function getCourses(){

    const courses = await Course.find({isPublished: true, tags: 'backend'})
    .sort({name: 1})
    .select({name:1, author:1})
    console.log(courses)
}

getCourses();