'use strict'

const cloudinary = require('cloudinary')
const { env } = process

cloudinary.config({
    cloud_name: env.CLOUD_NAME,
    api_key: env.API_KEY,
    api_secret: env.API_SECRET
})

const cloudinaryLogic = {
    uploadBuffer(name, buffer) {
        return new Promise((resolve, reject) => 
            cloudinary.v2.uploader.upload_stream((err, data) => {
                if (err) return reject(new LogicError(`the file could not be uploaded ${name}`))
                resolve(data.url)
            }).end(buffer))
    }

}

module.exports = cloudinaryLogic