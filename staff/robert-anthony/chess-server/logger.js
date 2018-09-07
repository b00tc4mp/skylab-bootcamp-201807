const winston = require('winston')


const MESSAGE = Symbol.for('message')

const jsonFormatter = (logEntry) => {
  const base = {timestamp: new Date()}
  const json = Object.assign(base, logEntry)
  logEntry[MESSAGE] = JSON.stringify(json)
  return logEntry
}

const logger  = winston.createLogger({
  level: 'debug',
  format: winston.format(jsonFormatter)(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]})

module.exports = logger