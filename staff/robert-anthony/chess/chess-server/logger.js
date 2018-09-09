const { createLogger, format, transports } = require('winston');
const { combine, timestamp, align,colorize, printf } = format;


const myFormat = printf(info => {
  return `${info.timestamp} [${info.level}: ${info.message}]`;
});


const logger = createLogger({
  level: 'debug',
  format: combine(
    colorize(),
    timestamp(),
    align(),
    myFormat
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({maxsize: 500000, filename: 'logs/error.log', level: 'error'}),
    new transports.File({maxsize: 500000, filename: 'logs/combined.log'})
  ]
})

module.exports = logger