new Promise(function(resolve, reject) {
    resolve(1);
    //reject(1);
})
.then(console.log)
.then(function() {
    return new Promise(function(resolve, reject) {
            //resolve(2);
            reject(2);
        })
        //.catch(console.warn);
    
})
.then(console.log)
.catch(console.error);
// 1
// 2