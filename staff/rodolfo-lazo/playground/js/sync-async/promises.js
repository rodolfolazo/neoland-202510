const log = msg =>
  console.log(
    '%c' + new Date().toISOString() + ' %c' + msg,
    'color: cyan',
    'color: orange'
  )

log('START')

Promise.resolve(10)
  .then(v => v * 2)
  .then(v => { throw v + 5 })
  .catch(v => v * 3)
  .then(v => { if (v > 40) throw v - 7; return v + 1 })
  .then(v => log('OK: ' + v))
  .catch(v => { throw 'ERR: ' + v })
  .then(v => log('DONE: ' + v))
  .catch(v => log('FINAL: ' + v))
