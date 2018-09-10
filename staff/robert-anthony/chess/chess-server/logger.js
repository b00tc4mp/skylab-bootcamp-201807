const {createLogger, format, transports} = require('winston');
const {combine, timestamp, align, colorize, printf} = format;

const path = require('path')

const myFormat = printf(info => {
  return info.message;
});


const logger = createLogger({
  level: 'debug',
  format: combine(
    colorize(),
    align(),
    myFormat
  ),
  transports: [
    new transports.Console(),
     new transports.File({maxsize: 500000, filename: path.join(__dirname,'logs/error.log'), level: 'error'}),
    new transports.File({maxsize: 500000, filename:  path.join(__dirname,'logs/combined.log')})
  ]
})

module.exports = logger