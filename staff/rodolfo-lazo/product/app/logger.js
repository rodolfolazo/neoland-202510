
function debug(message) {
    console.debug('%cDEBUG ' + message, 'font-weight: bold; color: lightgreen;')
}

function info(message) {
    console.info('%cINFO ' + message, 'font-weight: bold; color: dodgerblue;')
}

function warn(message) {
    console.warn('%cWARN ' + message, 'font-weight: bold; color: gold;')
}

function error(message) {
    console.error('%cERROR ' + message, 'font-weight: bold; color: tomato;')
}

function fatal(message) {
    console.error('%cFATAL ' + message, 'font-weight: bold; color: white; background-color: tomato;')
}

export const logger = {
    debug,
    info,
    warn,
    error,
    fatal
}