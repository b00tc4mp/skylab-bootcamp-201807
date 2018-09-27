const fs = require('fs')
const { StringDecoder } = require('string_decoder')
const tf = require('@tensorflow/tfjs')
const Canvas = require('canvas')
const rimraf = require('rimraf');

const loadWeights = urlPath => {

    return new Promise((resolve, reject) => {

        const weightsCache = {};
        if (urlPath in weightsCache)
            return resolve(weightsCache[urlPath])

        if (!fs.existsSync(urlPath))
            return reject(new Error('missing model'))

        fs.readFile(urlPath, (err, buf) => {

            if (err)
                return reject(new Error('error loading model'))

            const parts = [];
            let offset = 0;
            while (offset < buf.byteLength) {
                const b = new Uint8Array(buf.slice(offset, offset + 4));
                offset += 4;
                const len = (b[0] << 24) + (b[1] << 16) + (b[2] << 8) + b[3]; // eslint-disable-line no-bitwise
                parts.push(buf.slice(offset, offset + len));
                offset += len;
            }

            const shapes = JSON.parse((new StringDecoder('utf8')).end(parts[0]));

            let index = parts[1]
            let ab = new ArrayBuffer(index.length);
            let view = new Uint8Array(ab);
            for (var i = 0; i < index.length; ++i) {
                view[i] = index[i]
            }
            index = new Float32Array(ab)

            const encoded = new Uint8Array(parts[2]);

            const arr = new Float32Array(encoded.length);
            for (let i = 0; i < arr.length; i += 1) {
                arr[i] = index[encoded[i]];
            }

            const weights = {};
            offset = 0;
            for (let i = 0; i < shapes.length; i += 1) {
                const { shape } = shapes[i];
                const size = shape.reduce((total, num) => total * num);
                const values = arr.slice(offset, offset + size);
                const tfarr = tf.tensor1d(values, 'float32');
                weights[shapes[i].name] = tfarr.reshape(shape);
                offset += size;
            }
            weightsCache[urlPath] = weights;
            resolve(weights);
        })
    })

}

const array3DToCanvas = tensor => {
    const [imgWidth, imgHeight] = tensor.shape;
    // llega un tensor de 1s (imagen blanca)
    const data = tensor.dataSync();
    const canvas = new Canvas(imgWidth, imgHeight)
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, imgWidth, imgHeight);

    for (let i = 0; i < imgWidth * imgHeight; i += 1) {
        const j = i * 4;
        const k = i * 3;
        imageData.data[j + 0] = Math.floor(256 * data[k + 0]);
        imageData.data[j + 1] = Math.floor(256 * data[k + 1]);
        imageData.data[j + 2] = Math.floor(256 * data[k + 2]);
        imageData.data[j + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas
}

const canvasToFile = (canvas, fileName) => {
    const out = fs.createWriteStream(fileName)
    const stream = canvas.pngStream()
    stream.on('data', chunk => out.write(chunk))
    stream.on('end', () => console.log(fileName + ' saved'))
    stream.on('error', err => console.log(err.message))
}

const createFolder = path => {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(path)) {
            rimraf(path, err => {
                if (err) return reject(err)

                fs.mkdir(path, err => {
                    if (err) return reject(err)

                    resolve()
                })
            })
        } else
            fs.mkdir(path, err => {
                if (err) return reject(err)

                resolve()
            })
    })
}

const deleteFolder = path => {
    return new Promise((resolve, reject) =>
        rimraf(path, err => {
            if (err) return reject(err)

            resolve()
        })
    )
}

module.exports = {
    loadWeights,
    array3DToCanvas,
    canvasToFile,
    createFolder,
    deleteFolder
}
