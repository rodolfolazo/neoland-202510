var collection = {
    count: 0
}

collection.add = function(item) {
    this[this.count] = item
    this.count++
}

collection.add('Peter')
console.log(collection)
// { 0: 'Peter', count: 1 }

collection.add('Wendy')
console.log(collection)
// { 0: 'Peter', 1: 'Wendy', count: 2 }

collection.add('James')
console.log(collection)
// { 0: 'Peter', 1: 'Wendy', 2: 'James', count: 3 }

collection.remove = function(item) {
    for (var i = 0; i < this.count; i++)
        if (this[i] === item)
            delete this[i]
}

collection.remove('Wendy')
console.log(collection)
// { 0: 'Peter', 2: 'James', count: 3 }

collection.add('Wendy')
collection.add('Pepito')
collection.add('Wendy')
console.log(collection)
// { 0: 'Peter', 2: 'James', 3: 'Wendy', 4: 'Pepito', 5: 'Wendy', count: 6 }

collection.removeFirst = function(item) {
    for (var i = 0; i < this.count; i++)
        if (this[i] === item) {
            delete this[i]

            return
        }
}

collection.removeFirst('Wendy')
console.log(collection)
// { 0: 'Peter', 2: 'James', 4: 'Pepito', 5: 'Wendy', count: 6 }

collection.add('Pepito')
console.log(collection)
// { 0: 'Peter', 2: 'James', 4: 'Pepito', 5: 'Wendy', 6: 'Pepito', count: 7 }

collection.update = function(target, replacement) {
    for (var i = 0; i < this.count; i++)
        if (this[i] === target)
            this[i] = replacement
}

collection.update('Pepito', 'Jiminy')
console.log(collection)
// { 0: 'Peter', 2: 'James', 4: 'Jiminy', 5: 'Wendy', 6: 'Jiminy', count: 7 }

collection.updateFirst = function(target, replacement) {
    for (var i = 0; i < this.count; i++)
        if (this[i] === target) {
            this[i] = replacement

            return
        }
}

collection.updateFirst('Jiminy', 'Pepito')
console.log(collection)
// { 0: 'Peter', 2: 'James', 4: 'Pepito', 5: 'Wendy', 6: 'Jiminy', count: 7 }