// import styles to inject it to the head tag
import styles from '../sass/app.scss'

import TweenMax from 'gsap'
import TimelineMax from 'gsap/TimelineMax'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import ScrollMagic from 'scrollmagic'

class Application {
    
  constructor() {
    this.anchors = document.querySelectorAll('.intro__anchor')

    // variables for intro animations
    this.introTitle      = document.querySelectorAll('.js-title')
    this.introName       = document.querySelector('.js-name')
    this.introContent    = document.querySelectorAll('.js-content')
    this.firstAnchor     = document.querySelectorAll('.js-anchor-first')
    this.secondAnchor    = document.querySelectorAll('.js-anchor-second')

    this._init()
  }

  _init() {
    this._initEvents()
    this._animateIntro()
    this._initScroll()
  }

  _initEvents() {
    this.anchors.forEach(anchor => {
      anchor.addEventListener('click', this._scrollToElem.bind(this))
    })
  }

  _scrollToElem(e) {
    const targetScroll = e.target.dataset.scroll

    //TweenMax.to(window, 1, {scrollTo: document.querySelector(`.${targetScroll}`), ease: Power1.easeOut})
  }

  _animateIntro() {
    //init Timeline, kill it on completion for performance gain
    let tl = new TimelineMax({onComplete: () => {
      tl.kill()
    }})

    // set elements position
    tl.set([this.introTitle, this.introName], {y: 60})
    tl.set(this.introContent, {y: 20})
    tl.set([this.firstAnchor, this.secondAnchor], {y: -20})

    // fadein title
    tl.to(this.introTitle, 1, {
      autoAlpha: 1,
      ease: Power2.easeInOut
    }, "start+=0.5")

    // translate title to its position
    tl.to([this.introTitle, this.introName], 0.75, {
      y: 0,
      ease: Power2.easeInOut
    }, "start+=1")

    // animate content line by line
    tl.staggerTo(this.introContent, 0.75, {
      y: 0,
      autoAlpha: 1,
      ease: Power2.easeOut
    }, 0.2, "start+=1.4")

    // animate first anchor
    tl.staggerTo(this.firstAnchor, 0.5, {
      y: 0,
      autoAlpha: 1,
      ease: Power2.easeOut
    }, 0.1, "start+=1.9")

    // animate second anchor
    tl.staggerTo(this.secondAnchor, 0.5, {
      y: 0,
      autoAlpha: 1,
      ease: Power2.easeOut
    }, 0.1, "start+=2.2")
      
  }

  _initScroll() {

  }

}

document.addEventListener("DOMContentLoaded", function() { 
  const app = new Application()
})
