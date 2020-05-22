// CREATE SETTLED PROMISES

let p = Promise.resolve({id: 1})

p.then(result => console.log(result))

p = Promise.reject(new Error('Rejectd...'))

p.catch(error => console.log(error))

//RUNNING PROMISES IN PARALLEL

const p1 = new Promise((resolve, reject) => {
    setTimeout(()=>{
        console.log('Async op one')
        //reject(new Error('p1 error'))
        resolve(1)
    },2000)
})


const p2 = new Promise((resolve) => {
    setTimeout(()=>{
        console.log('Async op two')
        resolve(2)
    },2000)
})

Promise.all([p1,p2])
.then(result => console.log(result))
.catch(err => console.log('ERROR',err.message))


//resolves the values of the first fullfill promise.
Promise.race([p1,p2])
.then(result => console.log(result))
.catch(err => console.log('ERROR',err.message))