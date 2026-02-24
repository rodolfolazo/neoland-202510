// spread operator in arrays

const names = ['Albert', 'Agus', 'Jorge', 'Sergio']
console.log('names', names)

const names1 = ['Patri', ...names]
console.log('names1', names1)

const names2 = [...names, 'Juan']
console.log('names2', names2)

const names3 = ['Patri', ...names, 'Juan']
console.log('names3', names3)

