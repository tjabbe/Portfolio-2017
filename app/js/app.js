// import styles to inject it to the head tag
import styles from '../sass/app.scss'

class Application {
    
    constructor() {
        this.title = document.querySelector('.test')
        this._init()
    }

    _init() {
        this._initEvents()
    }

    _initEvents() {
        console.log(this.title)
        console.log('non')
    }
}

document.addEventListener("DOMContentLoaded", function() { 
  const app = new Application()
});
