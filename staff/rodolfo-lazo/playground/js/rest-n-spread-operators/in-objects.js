// spread operator in objects

const person = { name: 'Peter', age: 23, country: 'Neverland', isStudent: true }
console.log('person', person)

const person1 = { ...person, isStudent: false }
console.log('person1', person1)

const person2 = { ...person, sports: ['bicycle', 'skate']}
console.log('person2', person2)

