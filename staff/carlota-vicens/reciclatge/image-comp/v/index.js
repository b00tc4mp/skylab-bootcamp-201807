// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();
const puntverd = ['wood', 'flowerpot', 'tool', 'pen', 'drinkware', 'auto part', 'clothes hanger', 'toy', 'frying part', 'vase', 'cookware and bakeware', 'cuttery', 'radiography', 'home appliance', 'fluorescent', 'circle', 'tire', 'dishware', 'cable', 'hardware', 'mirror', 'bag', 'furniture', 'photograf album', 'electronic device', 'electronic accesory', 'pipe', 'highliting']
// Performs label detection on the image file
const exist = false

client
    .labelDetection('pin.jpg')
    .then(results => {
        const labels = results[0].labelAnnotations
        let description = labels.map(label => label.description)
        return description
    })
    .then(description => {
        for (let i = 0; i < description.length; i++) {
            switch (description[i]) {
                case 'can' || 'plastic':
                    console.log('plastic');
                    break;
                case 'glass':
                    console.log('vidre');
                    break;
                case 'food':
                    console.log('marro');
                    break;
                case 'carton' || 'paper':
                    console.log('paper');
                    break;
                default:
                    for (let j = 0; j < puntverd.length; j++) {
                        if (puntverd[j] === description[i]) {
                            exist = true
                        }
                    }
                    if (exist === true) {
                        console.log('punt verd')
                    } else { 
                        console.log('rebuig')
                    }
            }

        }
    })
    .catch(err => err)

