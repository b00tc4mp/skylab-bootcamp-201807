'use strict'

module.exports = youtubeurl => {
    return /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/.test(youtubeurl)
}