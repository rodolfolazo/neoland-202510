import { Dino } from './Dino.mjs'

const root = document.getElementById('root')

const STEP = 10

const dino = new Dino()
dino.setX(100)
dino.setY(100)
root.appendChild(dino.container)

document.addEventListener('keydown', event => {
    console.log(event.key)

    const { key } = event

    if (key === 'ArrowUp')
        dino.setY(dino.getY() - STEP)
    else if(key === 'ArrowDown')
        dino.setY(dino.getY() + STEP)
    else if (key === 'ArrowLeft')
        dino.setX(dino.getX() - STEP)
    else if(key === 'ArrowRight')
        dino.setX(dino.getX() + STEP)
})

const dino2 = new Dino()
dino2.setX(100)
dino2.setY(300)
root.appendChild(dino2.container)

document.addEventListener('keydown', event => {
    console.log(event.key)

    const { key } = event

    if (key === 'w')
        dino2.setY(dino2.getY() - STEP)
    else if(key === 's')
        dino2.setY(dino2.getY() + STEP)
    else if (key === 'a')
        dino2.setX(dino2.getX() - STEP)
    else if(key === 'd')
        dino2.setX(dino2.getX() + STEP)
})

const dino3 = new Dino()
dino3.setX(100)
dino3.setY(500)
root.appendChild(dino3.container)
