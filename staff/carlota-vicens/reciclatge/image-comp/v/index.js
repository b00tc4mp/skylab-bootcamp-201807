// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

// Performs label detection on the image file
client
    .labelDetection('pin.jpg')
    .then(results => {
        const labels = results[0].labelAnnotations
        let description = labels.map(label => label.description)
        return description
    })
    .then ( description =>{
        for (let i = 0; i < description.length; i++) {
          switch (description[i] ){
              case 'can' || 'plastic':
                console.log(plastic);
                break;              


          }

  
        
        }
    })
    .catch(err => err)

