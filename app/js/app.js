// import styles to inject it to the head tag
import styles from '../sass/app.scss'

import TweenLite from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import ScrollMagic from 'scrollmagic'

class Application {
    
  constructor() {
    this.anchors  = document.querySelectorAll('.intro__anchor')

    this._init()
  }

  _init() {
    this._initEvents()
  }

  _initEvents() {
    this.anchors.forEach(anchor => {
      anchor.addEventListener('click', this._scrollToElem.bind(this))
    })
  }

  _scrollToElem(e) {
    const targetScroll = e.target.dataset.scroll

    TweenLite.to(window, 1, {scrollTo: document.querySelector(`.${targetScroll}`), ease: Power1.easeOut})
  }

}

document.addEventListener("DOMContentLoaded", function() { 
  const app = new Application()
})
