var error1 = new TypeError('invalid name type')
var error2 = new RangeError('invalid name length')

console.log('error1')
console.log(error1 instanceof TypeError)
console.log(error1 instanceof RangeError)
console.log(error1 instanceof Error)

console.log('error2')
console.log(error2 instanceof TypeError)
console.log(error2 instanceof RangeError)
console.log(error2 instanceof Error)