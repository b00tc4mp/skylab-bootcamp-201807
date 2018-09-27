const http = require('http')

const url_1 = process.argv[2]
const url_2 = process.argv[3]
const url_3 = process.argv[4]

const urls = [url_1,url_2,url_3]
const results = []
let count = 0
for (let index = 0; index < urls.length; index++) {
        
        http.get(urls[index], function(response) {
            let result = ''
            response.setEncoding("utf-8");
            response.on("data", function (data) {
                result+=data
            })
            response.on('end',() => {
                results[index] =result
      
                if(++count === urls.length){
                    for (let index = 0; index < results.length; index++) {
                        console.log(results[index]);
                        
                    }
                }
            })
        });
     
}

                                                             
// var http = require('http')                                 
// var bl = require('bl')                                     
// var results = []                                           
// var count = 0                                              
                                                           
// function printResults () {                                 
//   for (var i = 0; i < 3; i++) {                            
//     console.log(results[i])                                
//   }                                                        
// }                                                          
                                                           
// function httpGet (index) {                                 
//   http.get(process.argv[2 + index], function (response) {  
//     response.pipe(bl(function (err, data) {                
//       if (err) {                                           
//         return console.error(err)                          
//       }                                                    
                                                           
//       results[index] = data.toString()                     
//       count++                                              
                                                           
//       if (count === 3) {                                   
//         printResults()                                     
//       }                                                    
//     }))                                                    
//   })                                                       
// }                                                          
                                                           
// for (var i = 0; i < 3; i++) {                              
//   httpGet(i)                                               
// }  


// Hay por lo menos dos formas de resolver este problema:

// 1) Almacenar los datos de todos los eventos "data" para luego
// agregarlos los resultados antes de imprimirlos por consola. Puedes usar
// el evento "end" para saber cuando terminas de recibir datos.

// 2) Usa un paquete de terceros para evitar los problemas de almacenar el
// stream completo de datos. Por ejemplo, tienes a disposición: bl (Buffer
// List) o concat-stream.
// Ambos paquetes pueden usar un stream piped para capturar los datos. Una  
// vez que se acaba el stream se dispara un callback con todos los datos:   
                                                                         
//    response.pipe(bl(function (err, data) { /* ... */ }))                 
//    // or                                                                 
//    response.pipe(concatStream(function (data) { /* ... */ }))            
                                                                         
// Recuerda hacer data.toString() para convertir al Buffer de Node a        
// String.                                                                  
                                                                         
// Puedes leer la documentación de ambos módulos en la carpeta de           
// instalación de learnyounode en:                                          
                                                                         
// file://C:\Users\berna\AppData\Roaming\npm\node_modules\learnyounode\doc  
// s\bl.html                                                                
// file://C:\Users\berna\AppData\Roaming\npm\node_modules\learnyounode\doc  
// s\concat-stream.html                                                     
                                                                         