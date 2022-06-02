export default class Post { //экспортируем класс Post в index.js
    constructor (title){
        this.title = title
        this.date = new Date()
    }
    toSttring() {
        return JSON.stringify({
            title: this.title,
            date: this.date.toJSON()
        })
    }
    
}