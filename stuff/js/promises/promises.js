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
        .catch(function(error) {
            console.warn(error);

            throw Error(22);
        });
    
})
.then(function(value) {
    console.log(value);

    return value + 100;
})
.then(console.log)
.catch(console.error)
.then(function() {
    return 1000;
})
.then(console.log);