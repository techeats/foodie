import path from 'path'
import { createLogger, format, transports } from 'winston'
import chalk from 'chalk'

const { combine, colorize, label, printf, splat, timestamp } = format

const LOGS_DIR = 'logs'

const myFormat = printf(
  info =>
    `${info.timestamp} ${chalk.cyan(info.label)} ${info.level}: ${info.message}`
)

const logFormat = loggerLabel =>
  combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    splat(),
    colorize(),
    label({ label: loggerLabel }),
    myFormat
  )
  

const createLoggerWithLabel = label =>
  createLogger({
    level: process.env.LOG_LEVEL || 'info',
    transports: [
      new transports.Console({
        colorize: true,
        timestamp: myFormat,
        level: 'debug',
        showLevel: true,
        handleExceptions: true,
        humanReadableUnhandledException: true
      }),
      new transports.File({
        filename: path.join(LOGS_DIR, 'error.log'),
        level: 'error'
      }),
      new transports.File({
        filename: path.join(LOGS_DIR, 'debug.log'),
        level: 'info'
      })
    ],
    format: logFormat(label)
  })

if (process.env.NODE_ENV !== 'production') {
  createLoggerWithLabel(label).add(
    new transports.Console({
      format: combine(
        colorize(),
        label({ label: 'Foodie API' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })
      )
    })
  )
}

export default  {
  gateway: createLoggerWithLabel('[FOODIE:gateway]'),
  policy: createLoggerWithLabel('[FOODIE:policy]'),
  config: createLoggerWithLabel('[FOODIE:config]'),
  db: createLoggerWithLabel('[FOODIE:db]'),
  admin: createLoggerWithLabel('[FOODIE:admin]'),
  plugins: createLoggerWithLabel('[FOODIE:plugins]'),
  email: createLoggerWithLabel('[FOODIE:email]'),
  createLoggerWithLabel
}
