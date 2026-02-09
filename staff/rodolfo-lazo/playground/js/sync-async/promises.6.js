const log = message => console.log('%c' + new Date().toISOString() + ' %c' + message, 'color: greenyellow', 'color: tomato')

log('START')


Promise.resolve('start')
    .then(value => value + ' and go')
    .then(value => value + ' and continue')
    .then(value => { throw value + ' wtf' })
    .then(value => value + ' sorry')
    .catch(value => { throw value + ' yay'})
    .then(value => { throw value + ' yuhu'})
    .then(value => log(value))
    .then(() => log('end'))
    .catch(value => log(value))


/**
async function main() {
    try {
        let value = await (async () => 'start')() // IIFE - Immediate Invoked Function Expression
        value = await (async () => value + ' and go')()
        value = await (async () => value + ' and continue')()
        await (async () => { throw value + ' wtf' })()
        value = await (async () => value + ' sorry')()
    } catch(value) {
        try {
            await (async () => { throw value + ' yay' })()
            await (async () => { throw value + ' yuhu' })()
            await (async () => log(value))()
            await (async () => log('end'))()
        } catch(value) {
            await (async () => log(value))()
        }
    }
}

main()
/**/

log('END')