export class Component {
    constructor(width, height){
        this.width = width
        this.height = height
        this.x = 0
        this.y = 0
    }

    getWidth(){
        return this.width
    }

    setWidth(width){
        this.width = width
    }

    getHeight(){
        return this.height
    }

    setHeight(height){
        this.height = height
    }

    getX(){
        return this.x
    }

    setX(x){
        this.x  = x
    }

    getY(){
        return this.y
    }

    setY(y){
        this.y = y
    }
}