const log = message => console.log('%c' + new Date().toISOString() + ' %c' + message, 'color: greenyellow', 'color: tomato')

log('start')
Promise.resolve(10)
    .then(value => Promise.resolve(value + 20))
    .then(value => value + 40)
    .then(value => { throw value })
    .then(value => Promise.reject(value + 30))
    .then(value => log(value))
    .catch(value => log(value))
    .then(value => { throw value })
    .then(() => log('end'))
    .catch(value => log(value))

