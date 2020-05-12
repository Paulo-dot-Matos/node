const p = new Promise(function(resolve, reject){
    //do some async work
    setTimeout(()=>{
        //resolve(1);
        reject(new Error('Message'));
    },2000);
    
    
});

p.then(result => console.log('Result: ' + result))
.catch(err => console.log('Error: ', err.message));





