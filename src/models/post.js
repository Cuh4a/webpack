export default class Post { //экспортируем класс Post в index.js
    constructor (title, img){
        this.title = title
        this.img = img
        this.date = new Date()
    }
    toSttring() {
        return JSON.stringify({
            title: this.title,
            date: this.date.toJSON(),
            img: this.img
        }, null, 2)
    }
    
    get uppercaseTitle() {
        return this.title.toUpperCase()
    }
}