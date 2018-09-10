const tf = require('@tensorflow/tfjs')
const { exec } = require('child_process')
const fs = require('fs')
const Canvas = require('canvas')
const Image = Canvas.Image

const {
    loadWeights,
    array3DToCanvas,
    createFolder,
    deleteFolder
} = require('./utils')

class Pix2pix {
    constructor(model, callback) {
        this.ready = false;

        this.loadCheckpoints(model).then(() => {
            this.ready = true;
            if (callback) {
                callback();
            }
        });
    }

    async loadCheckpoints(path) {
        this.weights = await loadWeights(path);
    }

    async transfer(inputElement, callback = () => { }) {
        const input = tf.fromPixels(inputElement);
        const inputData = input.dataSync();
        const floatInput = tf.tensor3d(inputData, input.shape);
        const normalizedInput = tf.div(floatInput, tf.scalar(255));

        function preprocess(inputPreproc) {
            return tf.sub(tf.mul(inputPreproc, tf.scalar(2)), tf.scalar(1));
        }

        function deprocess(inputDeproc) {
            return tf.div(tf.add(inputDeproc, tf.scalar(1)), tf.scalar(2));
        }

        function batchnorm(inputBat, scale, offset) {
            const moments = tf.moments(inputBat, [0, 1]);
            const varianceEpsilon = 1e-5;
            return tf.batchNormalization(inputBat, moments.mean, moments.variance, varianceEpsilon, scale, offset);
        }

        function conv2d(inputCon, filterCon) {
            return tf.conv2d(inputCon, filterCon, [2, 2], 'same');
        }

        function deconv2d(inputDeconv, filterDeconv, biasDecon) {
            const convolved = tf.conv2dTranspose(inputDeconv, filterDeconv, [inputDeconv.shape[0] * 2, inputDeconv.shape[1] * 2, filterDeconv.shape[2]], [2, 2], 'same');
            const biased = tf.add(convolved, biasDecon);
            return biased;
        }

        const result = tf.tidy(() => {
            const preprocessedInput = preprocess(normalizedInput);

            const layers = [];
            let filter = this.weights['generator/encoder_1/conv2d/kernel'];
            let bias = this.weights['generator/encoder_1/conv2d/bias'];
            let convolved = conv2d(preprocessedInput, filter, bias);
            layers.push(convolved);

            for (let i = 2; i <= 8; i += 1) {
                const scope = `generator/encoder_${i.toString()}`;
                filter = this.weights[`${scope}/conv2d/kernel`];
                const bias2 = this.weights[`${scope}/conv2d/bias`];
                const layerInput = layers[layers.length - 1];
                const rectified = tf.leakyRelu(layerInput, 0.2);
                convolved = conv2d(rectified, filter, bias2);
                const scale = this.weights[`${scope}/batch_normalization/gamma`];
                const offset = this.weights[`${scope}/batch_normalization/beta`];
                const normalized = batchnorm(convolved, scale, offset);
                layers.push(normalized);
            }

            for (let i = 8; i >= 2; i -= 1) {
                let layerInput;
                if (i === 8) {
                    layerInput = layers[layers.length - 1];
                } else {
                    const skipLayer = i - 1;
                    layerInput = tf.concat([layers[layers.length - 1], layers[skipLayer]], 2);
                }
                const rectified = tf.relu(layerInput);
                const scope = `generator/decoder_${i.toString()}`;
                filter = this.weights[`${scope}/conv2d_transpose/kernel`];
                bias = this.weights[`${scope}/conv2d_transpose/bias`];
                convolved = deconv2d(rectified, filter, bias);
                const scale = this.weights[`${scope}/batch_normalization/gamma`];
                const offset = this.weights[`${scope}/batch_normalization/beta`];
                const normalized = batchnorm(convolved, scale, offset);
                layers.push(normalized);
            }

            const layerInput = tf.concat([layers[layers.length - 1], layers[0]], 2);
            let rectified2 = tf.relu(layerInput);
            filter = this.weights['generator/decoder_1/conv2d_transpose/kernel'];
            const bias3 = this.weights['generator/decoder_1/conv2d_transpose/bias'];
            convolved = deconv2d(rectified2, filter, bias3);
            rectified2 = tf.tanh(convolved);
            layers.push(rectified2);

            const output = layers[layers.length - 1];
            const deprocessedOutput = deprocess(output);
            return deprocessedOutput;
        });

        await tf.nextFrame();
        callback(array3DToCanvas(result));
    }
}

const pix2pix = (model, callback = () => { }) => new Pix2pix(model, callback)

const _pix2pix = {

    model: null,

    async transfer(path, _out) {
        await new Promise((resolve, reject) => {

            const img = new Image
            img.src = path
            const canvas = new Canvas(256, 256)
            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 256, 0, 256, 256, 0, 0, 256, 256)

            this.model.transfer(canvas, result => {

                const resultCanvas = new Canvas(512, 256)
                const rctx = resultCanvas.getContext('2d')
                const resultImg = new Image 
                resultImg.src = result.toDataURL()
                rctx.drawImage(img, 0, 0, 256, 256, 0, 0, 256, 256)
                rctx.drawImage(resultImg, 0, 0, 256, 256, 256, 0, 256, 256)

                const filename = `${_out}.png`
                const out = fs.createWriteStream(filename)
                const stream = resultCanvas.pngStream()
                stream.on('data', chunk => out.write(chunk))
                stream.on('end', resolve)
                stream.on('error', reject)

            })

        })

    },

    async buildResult(userPath, datasetPath, modelPath, resultPath, settings) {

        const FPS = settings.FPS
        const frames = `${userPath}/frames`
        await createFolder(frames)

        const results = `${userPath}/results-frames`
        await createFolder(results)

        await new Promise((resolve, reject) => {

            this.model = pix2pix(modelPath, () => {

                console.log('model loaded')

                // resize video
                exec(`ffmpeg -i ${datasetPath} -r ${FPS} -vf scale=512:256 ${frames}/resized.m4v`, err => {
                    if (err) return reject(err)

                    // take frames
                    exec(`ffmpeg -i ${frames}/resized.m4v -r ${FPS} -f image2 ${frames}/img%04d.png`, err => {
                        if (err) return reject(err)

                        fs.unlinkSync(`${frames}/resized.m4v`)
                        
                        const files = fs.readdirSync(frames)

                        // infere pix2pix for each frame
                        Promise.all(files.map((file, index) =>
                            this.transfer(`${frames}/${file}`, `${results}/${index}`))
                        )
                            .then(() => {
                                return new Promise((resolve, reject) => {
                                    if (fs.existsSync(resultPath))
                                        fs.unlinkSync(resultPath)

                                    // build video from poses
                                    exec(`ffmpeg -r ${FPS} -i ${results}/%1d.png -c:v libx264 -r ${FPS} -pix_fmt yuv420p ${resultPath}`, err => {
                                        if (err) return reject(err)
                                        resolve()
                                    })

                                })
                            })
                            .then(() => deleteFolder(results))
                            .then(() => deleteFolder(frames))
                            .then(() => resolve())
                            .catch(err => {
                                return deleteFolder(results)
                                    .then(() => deleteFolder(frames))
                                    .then(() => reject(err))
                            })
                    })
                })

            })

        })

    }
}

module.exports = _pix2pix