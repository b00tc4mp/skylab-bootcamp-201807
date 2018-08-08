/*This problem is the same as the previous problem (HTTP COLLECT) in that  
  you need to use http.get(). However, this time you will be provided with  
  three URLs as the first three command-line arguments.  
   
  You must collect the complete content provided to you by each of the URLs  
  and print it to the console (stdout). You don't need to print out the  
  length, just the data as a String; one line per URL. The catch is that you  
  must print them out in the same order as the URLs are provided to you as  
  command-line arguments. */


var bl = require('bl') ;
var http = require('http');

var url1 = process.argv[2];
var url2 = process.argv[3];
var url3 = process.argv[4];


console.log('url1 ' + url1)
console.log('url2 ' + url2)
console.log('url3 ' + url3 + '\n')


//node inspect juggling-async.js "http://localhost:46540" "http://localhost:37390" "http://localhost:40368"



function httpCollect(url, endCallback) {
    http.get(url, function(response){
        response.pipe(bl(function (err, data) {
            if (err) throw err
            console.log('primerrrrr ' + url)
            console.log(data.toString() + '\n')
         }))

         console.log('endCallback ' + endCallback + '\n')

         if (endCallback) {
            response.on("end", function() {
                console.log('endddddd ' + url + '\n')
                endCallback();
             }) 
         }
    })
}

httpCollect(url1, httpCollect(url2, console.log('HOLAAAAAAAAAAA')))



//httpCollect(url1, httpCollect(url2, httpCollect(url3, null)))






/*function secondAnswer(){
    http.get(url2, function(response){
        response.pipe(bl(function (err, data) {
            if (err) throw err
            console.log(data.toString())
         }))
    })
}

function thirdAnswer(){
    http.get(url2, function(response){
        response.pipe(bl(function (err, data) {
            if (err) throw err
            console.log(data.toString())
         }))
    })
}

*/


/*http.get(url1, function(response){
    response.pipe(bl(function (err, data) {
        if (err) throw err
debugger;
        console.log(data.toString())
     }))
     response.on("end", function() {
        http.get(url2, function(response){
            response.pipe(bl(function (err, data) {
                if (err) throw err
                console.log(data.toString())
             }))
        })
     }) 
})*/

/*
http.get(url1, function(response){
    response.pipe(bl(function (err, data) {
        if (err) throw err
        console.log(data.toString())
     }))
     response.on("end", function() {
        http.get(url2, function(response){
            response.pipe(bl(function (err, data) {
                if (err) throw err
                console.log(data.toString())
             }))

             response.on("end", function() {
                http.get(url3, function(response){
                    response.pipe(bl(function (err, data) {
                        if (err) throw err
                        console.log(data.toString())
                     }))
                })
             }) 
        })
     }) 
})*/







