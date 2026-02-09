let millis = 2000
console.log('ask coffee', new Date().toISOString(), millis)
setTimeout(() => {
    console.log('start writing memory 2', new Date().toISOString())

    const before = Date.now()
    
    while(Date.now() - before < 5000) {
        //console.log('loop', new Date().toISOString())
    }
    
    console.log('drink coffee', new Date().toISOString())

    millis = 1500
    console.log('ask fotocopies', new Date().toISOString(), millis)
    setTimeout(() => {
        console.log('archive fotocopies', new Date().toISOString())

        console.log('start writing memory 3', new Date().toISOString())

        const before = Date.now()
        
        while(Date.now() - before < 5000) {
            //console.log('loop', new Date().toISOString())
        }

        millis = 4000
        console.log('ask report', new Date().toISOString(), millis)
        setTimeout(() => console.log('read report', new Date().toISOString()), millis)

        console.log('ended writing memory 3', new Date().toISOString())
    }, millis)

    console.log('ended writing memory 2', new Date().toISOString())
}, millis)

console.log('start writing memory', new Date().toISOString())

const before = Date.now()

while(Date.now() - before < 5000) {
    //console.log('loop', new Date().toISOString())
}

console.log('ended writing memory', new Date().toISOString())
