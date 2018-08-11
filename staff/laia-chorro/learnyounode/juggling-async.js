/*This problem is the same as the previous problem (HTTP COLLECT) in that  
  you need to use http.get(). However, this time you will be provided with  
  three URLs as the first three command-line arguments.  
   
  You must collect the complete content provided to you by each of the URLs  
  and print it to the console (stdout). You don't need to print out the  
  length, just the data as a String; one line per URL. The catch is that you  
  must print them out in the same order as the URLs are provided to you as  
  command-line arguments. */


const bl = require('bl') ;
const http = require('http');

const { argv: [, , ...urls ] } = process

let count = 0

const httpCollect = url => {
    http.get(url, response => {
        response.pipe(bl( (err, data) => {
            if (err) throw err
            console.log(data.toString())
        }))

        if (count < urls.length -1) {
            count++
            response.on('end', () => { httpCollect(urls[count]); }) 
        } 
    })       
} 

httpCollect(urls[count])
