class Logger {
    static DEBUG = 0
    static INFO = 1
    static WARN = 2
    static ERROR = 3
    static FATAL = 4

    constructor(level = Logger.DEBUG) {
        this.level = level
    }

    debug(message) {
        this.level <= Logger.DEBUG && console.debug('%cDEBUG ' + message, 'font-weight: bold; color: lightgreen;')
    }

    info(message) {
        this.level <= Logger.INFO && console.info('%cINFO ' + message, 'font-weight: bold; color: dodgerblue;')
    }

    warn(message) {
        this.level <= Logger.WARN && console.warn('%cWARN ' + message, 'font-weight: bold; color: gold;')
    }

    error(message) {
        this.level <= Logger.ERROR && console.error('%cERROR ' + message, 'font-weight: bold; color: tomato;')
    }

    fatal(message) {
        this.level <= Logger.FATAL && console.error('%cFATAL ' + message, 'font-weight: bold; color: white; background-color: tomato;')
    }

}

// instance

export const logger = new Logger(import.meta.env.VITE_LOG_LEVEL)