// import styles to inject it to the head tag
import styles from '../sass/app.scss'

class Application {
    
  constructor() {
    this._init()
  }

  _init() {
    this._initEvents()
  }

  _initEvents() {
    console.log('working')
  }

}

document.addEventListener("DOMContentLoaded", function() { 
  const app = new Application()
});
