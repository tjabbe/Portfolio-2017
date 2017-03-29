// import styles to inject it to the head tag
import styles from '../sass/app.scss'

import TweenMax from 'gsap/TweenMax'
import TimelineMax from 'gsap/TimelineMax'
import ScrollToPlugin from 'gsap/ScrollToPlugin'
import ScrollMagic from 'scrollmagic'
import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap'

class Application {
    
  constructor() {

    this.documentHeight = document.documentElement.scrollHeight

    // variables for intro animations
    this.header          = document.querySelector('.header')
    this.introTitle      = document.querySelectorAll('.js-title')
    this.introName       = document.querySelector('.js-name')
    this.introContent    = document.querySelectorAll('.intro__text')
    this.introLines      = ['.line-1']
    this.anchors = document.querySelectorAll('.intro__anchor')
    this.firstAnchor     = document.querySelectorAll('.js-anchor-first')
    this.secondAnchor    = document.querySelectorAll('.js-anchor-second')

    // store all project container and project elements
    this.projects      = document.querySelectorAll('.project')
    this.projectNumber = document.querySelectorAll('.project__number')
    this.projectCard   = document.querySelectorAll('.project__content')

    // store all project numbers
    this.numbers = document.querySelectorAll('.project__number')

    // store footer elements
    this.footerCatchline = document.querySelector('.footer__catchline')
    this.footerContact   = document.querySelector('.footer__contacts')

    this._init()
  }

  _init() {
    this._initEvents()
    this._parseIntro()
    this._animateIntro()

    // Init scroll animation only for tablet/desktop width
    if (window.innerWidth > 767) {
      this._initScroll()
    }
    
  }

  _initEvents() {
    this.anchors.forEach(anchor => {
      anchor.addEventListener('click', this._scrollToElem.bind(this))
    })
  }

  _parseIntro() {
    const paragraph      = document.querySelector('.intro__text')
    const initialContent = paragraph.innerHTML
    const words          = initialContent.split(' ')
    const wrappedWords   = words
      .filter(word => (word && word !== '\n'))
      .map(word => (`<span class="intro__word">${word}</span>`))
      .join(' ')
    
    paragraph.innerHTML = wrappedWords

    const SPAN_CLASS     = 'line-'
    const spans          = document.querySelectorAll('.intro__text span')
    let currentOffsetTop = spans[0].offsetTop
    let currentLine      = 1
    let spanClass        = SPAN_CLASS + currentLine

    spans.forEach(span => {
      const offsetTop = span.offsetTop

      // span on the same line
      if (currentOffsetTop === offsetTop) {
        span.classList.add(spanClass)
      }
      
      // span not on the same line, increment the line count and add new class
      else if (currentOffsetTop < offsetTop) {
        currentLine = currentLine + 1
        spanClass = SPAN_CLASS + currentLine
        span.classList.add(spanClass)
        currentOffsetTop = offsetTop
        this.introLines.push('.' + spanClass)
      }

    })
      
    // Set the right font-family (default is Arial for the parsing otherwise it doesn't work with this font for some reaons)
    paragraph.style.fontFamily = 'Averta-light'

  }

  _scrollToElem(e) {
    const targetScroll = e.target.dataset.scroll

    TweenMax.to(window, 1, {scrollTo: document.querySelector(`.${targetScroll}`), ease: Power1.easeOut})
  }

  _animateIntro() {

    //init Timeline, kill it on completion for performance gain
    let tl = new TimelineMax({onComplete: () => {
      tl.kill()
    }})

    TweenMax.set(this.introContent, {visibility: 'inherit'})

    // fadein name
    tl.from(this.introName, 1, {
      autoAlpha: 0,
      ease: Power2.easeInOut
    }, "start+=0.5")

    // fadein title
    tl.from(this.introTitle, 1, {
      autoAlpha: 0,
      ease: Power2.easeInOut
    }, "start+=1.5")

    // translate title to its position
    tl.from([this.introTitle, this.introName], 0.75, {
      y: 60,
      ease: Power2.easeInOut
    }, "start+=2")

    //animate content line by line
    tl.staggerFrom(this.introLines, 0.75, {
      y: 20,
      autoAlpha: 0,
      ease: Power2.easeOut
    }, 0.2, "start+=2.4")

    // animate first anchor
    tl.staggerFrom(this.firstAnchor, 0.5, {
      y: -20,
      autoAlpha: 0,
      ease: Power2.easeOut
    }, 0.1, "start+=2.9")

    // animate second anchor
    tl.staggerFrom(this.secondAnchor, 0.5, {
      y: -20,
      autoAlpha: 0,
      ease: Power2.easeOut
    }, 0.1, "start+=3.2")

    // animate header
    tl.from(this.header, 0.75, {
      autoAlpha: 0,
      ease: Power2.easeInOut
    }, "start+=3.7")
      
  }

  _initScroll() {
    // init scroll magic controller
    let controller = new ScrollMagic.Controller()

    // Create tweens

    // fadein projects on scroll
    this.projects.forEach(project => {

      // create fadein tween
      const fadeInProject = TweenMax.from(project, 1, {
        autoAlpha: 0,
        ease: Power2.easeInOut
      })

      const projectScene = new ScrollMagic.Scene({
        triggerElement: project,
        triggerHook: 0.9,
        reverse: false
      })
      .setTween(fadeInProject)
      .on('end', () => {
        projectScene.destroy()
      })
      .addTo(controller)
    })

    // parallax effect on project numbers
    this.projectNumber.forEach(number => {
      const parallaxNumber = TweenMax.fromTo(number, 1,
        {
          y: 0
        },
        {
          y: 90,
          ease: Linear.easeNone
        })

      const numberScene = new ScrollMagic.Scene({
        triggerElement: number.parentNode,
        triggerHook: 0.9,
        duration: window.innerHeight
      })
      .setTween(parallaxNumber)
      .addTo(controller)
    })

    // parallax effect on project cards
    this.projectCard.forEach(card => {
      const parallaxCard = TweenMax.fromTo(card, 1,
        {
          y: '100%'
        },
        {
          y: '-100%',
          ease: Linear.easeNone
        })

      const cardScene = new ScrollMagic.Scene({
        triggerElement: card.parentNode,
        triggerHook: 0.9,
        duration: window.innerHeight * 1.2//this.documentHeight
      })
      .setTween(parallaxCard)
      .addTo(controller)
    })

    // fadein footer catchline
    const fadeInCatchline = TweenMax.from(this.footerCatchline, 0.75, {
      autoAlpha: 0,
      ease: Power2.easeInOut
    })

    const catchlineScene = new ScrollMagic.Scene({
      triggerElement: this.footerCatchline,
      triggerHook: 0.9,
      reverse: false
    })
    .setTween(fadeInCatchline)
    .on('end', () => {
        catchlineScene.destroy()
      })
    .addTo(controller)

    // fadein footer contact 
    const fadeInContact = TweenMax.from(this.footerContact, 0.75, {
      autoAlpha: 0,
      ease: Power2.easeInOut
    })

    const contactScene = new ScrollMagic.Scene({
      triggerElement: this.footerContact,
      triggerHook: 0.9,
      reverse: false
    })
    .setTween(fadeInContact)
    .on('end', () => {
        contactScene.destroy()
      })
    .addTo(controller)

  }

}

document.addEventListener("DOMContentLoaded", function() { 
  const app = new Application()
})
