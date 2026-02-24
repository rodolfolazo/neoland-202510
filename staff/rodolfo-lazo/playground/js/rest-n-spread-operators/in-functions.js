// rest operator in functions

function salute(how, ...names) {
    names.forEach(name => console.log(how + ' ' + name))
}
 
salute('hello', 'Albert', 'Agus', 'Jorge', 'Sergio')

// spread operator in functions

const names = ['Albert', 'Agus', 'Jorge', 'Sergio']

salute('bye', ...names)