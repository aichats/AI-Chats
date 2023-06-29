import { createLogger, format, transports } from 'winston';


export const logger = createLogger({
  level: 'info', // Set the log level (e.g., 'info', 'debug', 'warn')
  format: format.simple(), // Set the log format
  /*format.combine(
    format.timestamp(),
    format.json()
  )*/
  transports: [
    new transports.Console(), // Add a console transport for logging to the console
    new transports.File({ filename: 'error.log', level: 'error' }) // Add a file transport for logging errors to a file
  ]
});
