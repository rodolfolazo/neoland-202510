export class Component {
    constructor(width, height, color) {
        this.width = width
        this.height = height
        this.color = color
        this.x = 0
        this.y = 0
        this.container = document.createElement('div')
        this.container.style.width = this.width + 'px'
        this.container.style.height = this.height + 'px'
        this.container.style.backgroundColor = this.color
        this.container.style.position = 'absolute'
        this.container.style.left = this.x + 'px'
        this.container.style.top = this.y + 'px'
    }

    getWidth() {
        return this.width
    }

    setWidth(width) {
        this.width = width
    }

    getHeight() {
        return this.height
    }

    setHeight(height) {
        this.height = height
    }

    getX() {
        return this.x
    }

    setX(x) {
        this.x = x
        this.container.style.left = this.x + 'px'
    }

    getY() {
        return this.y
    }

    setY(y) {
        this.y = y
        this.container.style.top = this.y + 'px'
    }

    add(child) {
        this.container.appendChild(child.container)
    }
}