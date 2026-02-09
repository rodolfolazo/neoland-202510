const log = message => console.log('%c' + new Date().toISOString() + ' %c' + message, 'color: greenyellow', 'color: tomato')

/**
setTimeout(() => {
    log('hola mundo')

    setTimeout(() => {
        log('hola mon')

        setTimeout(() => {
            log('hello world')

            setTimeout(() => {
                log('ciao mondo')

                setTimeout(() => {
                    log('privet mir')
                }, 5000)
            }, 4000)
        }, 3000)
    }, 2000)
}, 1000)
/**/

/**/
const setTimeoutPromised = (callback, millis) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            callback()

            resolve()
        }, millis)
    })
}

/**
setTimeoutPromised(() => {
    log('hola mundo')
}, 1000)
    .then(() => {
        return setTimeoutPromised(() => {
            log('hola mon')
        }, 2000)
    })
    .then(() => {
        return setTimeoutPromised(() => {
            log('hello world')
        }, 3000)
    })
    .then(() => {
        return setTimeoutPromised(() => {
            log('ciao mondo')
        }, 4000)
    })
    .then(() => {
        return setTimeoutPromised(() => {
            log('privet mir')
        }, 5000)
    })
/**/

/**/
const main = async () => {
    await setTimeoutPromised(() => {
        log('hola mundo')
    }, 1000)

    await setTimeoutPromised(() => {
        log('hola mon')
    }, 2000)

    await setTimeoutPromised(() => {
        log('hello world')
    }, 3000)

    await setTimeoutPromised(() => {
        log('ciao mondo')
    }, 4000)

    await setTimeoutPromised(() => {
        log('privet mir')
    }, 5000)
}

main()
/**/

log('waiting now for callbacks queue')