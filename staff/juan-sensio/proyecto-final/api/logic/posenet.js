global.XMLHttpRequest = require('xhr2')
const tf = require('@tensorflow/tfjs-node')
const posenet = require('@tensorflow-models/posenet')
const Canvas = require('canvas')
const Image = Canvas.Image
const fs = require('fs')
const { exec } = require('child_process');
const {createFolder, deleteFolder} = require('./utils')

let _net
posenet.load().then(net => {
    _net = net
    console.log('posenet loaded')
})

bones = {
    antebrazoI: [5, 7, 'blue'],
    brazoI: [7, 9, 'blueviolet'],
    antebrazoD: [6, 8, 'brown'],
    brazoD: [8, 10, 'burlywood'],
    musloI : [11, 13, 'chocolate'],
    piernaI: [13, 15, 'coral'],
    musloD: [12, 14, 'cyan'],
    piernaD: [14, 16, 'darkblue'],
    torsoI: [5, 11, 'darkviolet'],
    torsoD: [6, 12, 'deeppink'],
    cadera: [11, 12, 'gold'],
    hombros: [5, 6, 'goldenrod'],
    ojos: [1, 2, 'green'],
    cara1: [0, 1, 'greenyellow'],
    cara2: [0, 2, 'lawngreen']
}

const _posenet = {

    images: [],

    createCanvas(path, MAX_DIM) {
        const img = new Image
        img.src = path
        const canvas = new Canvas(MAX_DIM, MAX_DIM)
        const ctx = canvas.getContext('2d')
        if (img.width > img.height)
            ctx.drawImage(img, 0.5 * (img.width - img.height), 0, img.height, img.height, 0, 0, MAX_DIM, MAX_DIM)
        else
            ctx.drawImage(img, 0, 0.5 * (img.height - img.width), img.width, img.width, 0, 0, MAX_DIM, MAX_DIM)
        return canvas
    },

    createCanvasDataset(MAX_DIM) {
        const canvas = new Canvas(2 * MAX_DIM, MAX_DIM)
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = 'black'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        return canvas
    },

    async detectPose(path, result, settings) {
        const MAX_DIM = settings.MAX_DIM
        const ISF = settings.ISF
        const FH = settings.FH
        const OS = settings.OS
        const canvas = this.createCanvas(path, MAX_DIM)
        const pose = await _net.estimateSinglePose(canvas, ISF, FH, OS)
        await new Promise((resolve, reject) => {
            const canvasDataset = this.createCanvasDataset(MAX_DIM)
            const ctx = canvasDataset.getContext('2d')
            const img = new Image
            img.src = path

            let newKeypoints
            if (img.width > img.height)
                ctx.drawImage(img, 0.5 * (img.width - img.height), 0, img.height, img.height, 0, 0, MAX_DIM, MAX_DIM)
            else
                ctx.drawImage(img, 0, 0.5 * (img.height - img.width), img.width, img.width, 0, 0, MAX_DIM, MAX_DIM)

            newKeypoints = pose.keypoints.map(point => Object.assign({}, point, { position: { x: point.position.x + MAX_DIM, y: point.position.y } }))

            newKeypoints.forEach(point => {
                //console.log(point)
                if (point.score > 0.2) {
                    ctx.fillStyle = 'white';
                    ctx.beginPath();
                    ctx.arc(point.position.x, point.position.y, 5, 0, Math.PI * 2, false);
                    ctx.fill();
                }
            })

            for (let bone in bones) {
                const i1 = bones[bone][0]
                const i2 = bones[bone][1]
                const color = bones[bone][2] 
                const points = [newKeypoints[i1], newKeypoints[i2]]
                if (points[0].score > 0.2 && points[1].score > 0.2) {
                    ctx.fillStyle = 'white'
                    ctx.beginPath()
                    ctx.moveTo(points[0].position.x, points[0].position.y)
                    ctx.lineTo(points[1].position.x, points[1].position.y)
                    ctx.lineWidth = 5
                    ctx.strokeStyle = color
                    ctx.stroke()
                }
            }

            const resultPath = `${result}.png`
            this.images.push(resultPath)
            const out = fs.createWriteStream(resultPath)
            const stream = canvasDataset.pngStream();
            stream.on('data', chunk => out.write(chunk))
            stream.on('end', resolve)
            stream.on('error', reject)
        })
    },

    async buildDataset(videoPath, datasetPath, userPath, settings) {

        this.images = []

        const frames = `${userPath}/frames`
        await createFolder(frames)

        const poses = `${userPath}/poses`
        await createFolder(poses)

        const FRAME_RATE = settings.FPS

        //console.log(settings)

        // extract frames
        await new Promise((resolve, reject) => {
            exec(`ffmpeg -i ${videoPath} -r ${FRAME_RATE} ${frames}/img%04d.png`, err => {
                if (err) return reject(err)

                const files = fs.readdirSync(frames)

                // detect poses for each frame
                Promise.all(files.map((file, index) =>
                    this.detectPose(`${frames}/${file}`, `${poses}/${index}`, settings))
                )
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            if (fs.existsSync(datasetPath))
                                fs.unlinkSync(datasetPath)

                            // build video from poses
                            exec(`ffmpeg -r ${FRAME_RATE} -i ${poses}/%1d.png -c:v libx264 -r ${FRAME_RATE} -pix_fmt yuv420p ${datasetPath}`, err => {
                                if (err) return reject(err)
                                resolve()
                            });
                        })
                    })
                    .then(() => deleteFolder(poses))
                    .then(() => deleteFolder(frames))
                    .then(() => resolve())
                    .catch(err => {
                        return deleteFolder(poses)
                            .then(() => deleteFolder(frames))
                            .then(() => reject(err))
                    })
            })
        })
    }
}

module.exports = _posenet