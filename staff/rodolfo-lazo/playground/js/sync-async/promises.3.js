const log = message => console.log('%c' + new Date().toISOString() + ' %c' + message, 'color: greenyellow', 'color: tomato')

log('start')
    
new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve(10)
        reject(new Error(10))

        log(10)
    }, 1000)
})
    .then(value => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(value + 10)
                //reject(new Error(value + 10))

                log(value + 10)
            }, 2000)
        })
    })
    .then(value => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(value + 10)

                log(value + 10)
            }, 3000)
        })
    })
    .catch(error => log(error))
    .then(() => log('end'))

log('wait for queued callbacks')