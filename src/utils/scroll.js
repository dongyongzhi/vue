
import { addEvent, removeEvent, eventMixin } from '@/utils/envent'
import { getRect, offset } from '@/utils/dom'
const DEFAULT_OPTIONS = {
  startX: 0,
  startY: 0,
  scrollX: false,
  scrollY: true,
  disableMouse: true,
  disableTouch: false,
  resizePolling: 60,
  pullUpLoad: false,
  pullDownRefresh: false
}
export const TOUCH_EVENT = 1
export const MOUSE_EVENT = 2
export const eventType = {
  touchstart: TOUCH_EVENT,
  touchmove: TOUCH_EVENT,
  touchend: TOUCH_EVENT,

  mousedown: MOUSE_EVENT,
  mousemove: MOUSE_EVENT,
  mouseup: MOUSE_EVENT
}
export const inBrowser = typeof window !== 'undefined'
export const ua = inBrowser && navigator.userAgent.toLowerCase()
export const isWeChatDevTools = ua && /wechatdevtools/.test(ua)
export const isAndroid = ua && ua.indexOf('android') > 0
export const hasTouch = inBrowser && ('ontouchstart' in window || isWeChatDevTools)
function warn(msg) {
  console.error(`[BScroll warn]: ${msg}`)
}
function log(msg) {
  console.log(`[BScroll warn]: ${msg}`)
}
let vendor = (() => {
  if (!inBrowser) {
    return false
  }
  // first pick up standard to fix #743
  let transformNames = {
    standard: 'transform',
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform'
  }
  let elementStyle = inBrowser && document.createElement('div').style
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    if (style === 'transitionEnd') {
      return 'transitionend'
    }
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

function BScroll(el, options) {
  this.wrapper = typeof el === 'string' ? document.querySelector(el) : el
  if (!this.wrapper) {
    warn('Can not resolve the wrapper DOM.')
  }
  this.scroller = this.wrapper.children[0]
  if (!this.scroller) {
    warn('The wrapper need at least one child element to be scroller.')
  }
  this.scrollerStyle = this.scroller.style
  this.options = Object.assign({}, DEFAULT_OPTIONS, options)
  this._events = {}
  let eventOperation = addEvent
  this._handleDOMEvents(eventOperation)
  this.refresh()
  this.enabled = true
}

eventMixin(BScroll)

BScroll.prototype.handleEvent = function (e) {
  switch (e.type) {
    case 'touchstart':
    case 'mousedown':
      this._start(e)
      break
    case 'touchmove':
    case 'mousemove':
      this._move(e)
      break
    case 'touchend':
    case 'mouseup':
    case 'touchcancel':
    case 'mousecancel':
      this._end(e)
      break
    case 'orientationchange':
    case 'resize':
      this._resize()
      break
    case 'transitionend':
    case 'webkitTransitionEnd':
    case 'oTransitionEnd':
    case 'MSTransitionEnd':
      this._transitionEnd(e)
      break
  }
}
BScroll.prototype._handleDOMEvents = function (eventOperation) {
  let target = this.wrapper
  eventOperation(window, 'orientationchange', this)
  eventOperation(window, 'resize', this)

  if (!this.options.disableMouse) {
    eventOperation(this.wrapper, 'mousedown', this)
    eventOperation(target, 'mousemove', this)
    eventOperation(target, 'mousecancel', this)
    eventOperation(target, 'mouseup', this)
  }

  if (hasTouch && !this.options.disableTouch) {
    eventOperation(this.wrapper, 'touchstart', this)
    eventOperation(target, 'touchmove', this)
    eventOperation(target, 'touchcancel', this)
    eventOperation(target, 'touchend', this)
  }

  eventOperation(this.scroller, prefixStyle('transitionEnd'), this)
}

BScroll.prototype.enable = function () {
  this.enabled = true
}

BScroll.prototype.disable = function () {
  this.enabled = false
}
BScroll.prototype._start = function (e) {
  let _eventType = eventType[e.type]
  if (_eventType !== TOUCH_EVENT) {
    if (e.button !== 0) {
      return
    }
  }
  if (!this.enabled || this.destroyed || (this.initiated && this.initiated !== _eventType)) {
    return
  }
  this.initiated = _eventType

  if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
    e.preventDefault()
  }
  if (this.options.stopPropagation) {
    e.stopPropagation()
  }

  this.moved = false
  this.distX = 0
  this.distY = 0
  this.directionX = 0
  this.directionY = 0
  this.movingDirectionX = 0
  this.movingDirectionY = 0
  this.directionLocked = 0

  let point = e.touches ? e.touches[0] : e

  this.startX = this.x
  this.startY = this.y
  this.absStartX = this.x
  this.absStartY = this.y
  this.pointX = point.pageX
  this.pointY = point.pageY

  this.trigger('beforeScrollStart')
}

BScroll.prototype._move = function (e) {
  if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
    return
  }

  if (this.options.preventDefault) {
    e.preventDefault()
  }
  if (this.options.stopPropagation) {
    e.stopPropagation()
  }

  let point = e.touches ? e.touches[0] : e
  let deltaX = point.pageX - this.pointX
  let deltaY = point.pageY - this.pointY

  this.pointX = point.pageX
  this.pointY = point.pageY

  this.distX += deltaX
  this.distY += deltaY

  let absDistX = Math.abs(this.distX)
  let absDistY = Math.abs(this.distY)

  // If you are scrolling in one direction lock the other
  if (!this.directionLocked && !this.options.freeScroll) {
    if (absDistX > absDistY + this.options.directionLockThreshold) {
      this.directionLocked = 'h' // lock horizontally
    } else if (absDistY >= absDistX + this.options.directionLockThreshold) {
      this.directionLocked = 'v' // lock vertically
    } else {
      this.directionLocked = 'n' // no lock
    }
  }

  if (this.directionLocked === 'h') {
    if (this.options.eventPassthrough === 'vertical') {
      e.preventDefault()
    } else if (this.options.eventPassthrough === 'horizontal') {
      this.initiated = false
      return
    }
    deltaY = 0
  } else if (this.directionLocked === 'v') {
    if (this.options.eventPassthrough === 'horizontal') {
      e.preventDefault()
    } else if (this.options.eventPassthrough === 'vertical') {
      this.initiated = false
      return
    }
    deltaX = 0
  }

  deltaX = this.hasHorizontalScroll ? deltaX : 0
  deltaY = this.hasVerticalScroll ? deltaY : 0
  this.movingDirectionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0
  this.movingDirectionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0

  let newX = this.x + deltaX
  let newY = this.y + deltaY

  let top = false
  let bottom = false
  let left = false
  let right = false

  if (newX > this.minScrollX || newX < this.maxScrollX) {
    if ((newX > this.minScrollX && left) || (newX < this.maxScrollX && right)) {
      newX = this.x + deltaX / 3
    } else {
      newX = newX > this.minScrollX ? this.minScrollX : this.maxScrollX
    }
  }
  if (newY > this.minScrollY || newY < this.maxScrollY) {
    if ((newY > this.minScrollY && top) || (newY < this.maxScrollY && bottom)) {
      newY = this.y + deltaY / 3
    } else {
      newY = newY > this.minScrollY ? this.minScrollY : this.maxScrollY
    }
  }

  if (!this.moved) {
    this.moved = true
    this.trigger('scrollStart')
  }

  this.trigger('scroll', {
    x: this.x,
    y: this.y
  })


  let scrollLeft = document.documentElement.scrollLeft || window.pageXOffset || document.body.scrollLeft
  let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

  let pX = this.pointX - scrollLeft
  let pY = this.pointY - scrollTop

}

BScroll.prototype._end = function (e) {
  if (!this.enabled || this.destroyed || eventType[e.type] !== this.initiated) {
    return
  }
  this.initiated = false

  if (this.options.preventDefault && !preventDefaultException(e.target, this.options.preventDefaultException)) {
    e.preventDefault()
  }
  if (this.options.stopPropagation) {
    e.stopPropagation()
  }

  this.trigger('touchEnd', {
    x: this.x,
    y: this.y
  })

  this.isInTransition = false

  // ensures that the last position is rounded
  let newX = Math.round(this.x)
  let newY = Math.round(this.y)

  let deltaX = newX - this.absStartX
  let deltaY = newY - this.absStartY
  this.directionX = deltaX > 0 ? DIRECTION_RIGHT : deltaX < 0 ? DIRECTION_LEFT : 0
  this.directionY = deltaY > 0 ? DIRECTION_DOWN : deltaY < 0 ? DIRECTION_UP : 0

/*
  this._translate(newX, newY)

  this.endTime = getNow()
  let duration = this.endTime - this.startTime
  let absDistX = Math.abs(newX - this.startX)
  let absDistY = Math.abs(newY - this.startY)

  let time = 0
  // start momentum animation if needed
  if (this.options.momentum && duration < this.options.momentumLimitTime && (absDistY > this.options.momentumLimitDistance || absDistX > this.options.momentumLimitDistance)) {
    let top = false
    let bottom = false
    let left = false
    let right = false
    const bounce = this.options.bounce
    if (bounce !== false) {
      top = bounce.top === undefined ? true : bounce.top
      bottom = bounce.bottom === undefined ? true : bounce.bottom
      left = bounce.left === undefined ? true : bounce.left
      right = bounce.right === undefined ? true : bounce.right
    }
    const wrapperWidth = ((this.directionX === DIRECTION_RIGHT && left) || (this.directionX === DIRECTION_LEFT && right)) ? this.wrapperWidth : 0
    const wrapperHeight = ((this.directionY === DIRECTION_DOWN && top) || (this.directionY === DIRECTION_UP && bottom)) ? this.wrapperHeight : 0
    let momentumX = this.hasHorizontalScroll ? momentum(this.x, this.startX, duration, this.maxScrollX, this.minScrollX, wrapperWidth, this.options, this)
      : { destination: newX, duration: 0 }
    let momentumY = this.hasVerticalScroll ? momentum(this.y, this.startY, duration, this.maxScrollY, this.minScrollY, wrapperHeight, this.options, this)
      : { destination: newY, duration: 0 }
    newX = momentumX.destination
    newY = momentumY.destination
    time = Math.max(momentumX.duration, momentumY.duration)
    this.isInTransition = true
  } else {
    if (this.options.wheel) {
      newY = this._findNearestValidWheel(newY).y
      time = this.options.wheel.adjustTime || 400
    }
  }

  let easing = ease.swipe
  if (this.options.snap) {
    let snap = this._nearestSnap(newX, newY)
    this.currentPage = snap
    time = this.options.snapSpeed || Math.max(
      Math.max(
        Math.min(Math.abs(newX - snap.x), 1000),
        Math.min(Math.abs(newY - snap.y), 1000)
      ), 300)
    newX = snap.x
    newY = snap.y

    this.directionX = 0
    this.directionY = 0
    easing = this.options.snap.easing || ease.bounce
  }

  if (newX !== this.x || newY !== this.y) {
    // change easing function when scroller goes out of the boundaries
    if (newX > this.minScrollX || newX < this.maxScrollX || newY > this.minScrollY || newY < this.maxScrollY) {
      easing = ease.swipeBounce
    }
    this.scrollTo(newX, newY, time, easing)
    return
  }

  if (this.options.wheel) {
    this.selectedIndex = this._findNearestValidWheel(this.y).index
  }
*/
  this.trigger('scrollEnd', {
    x: this.x,
    y: this.y
  })
}

BScroll.prototype._resize = function () {
  if (!this.enabled) {
    return
  }
  // fix a scroll problem under Android condition
  if (isAndroid) {
    this.wrapper.scrollTop = 0
  }
  clearTimeout(this.resizeTimeout)
  this.resizeTimeout = setTimeout(() => {
    this.refresh()
  }, this.options.resizePolling)
}

BScroll.prototype.refresh = function () {
  const isWrapperStatic = window.getComputedStyle(this.wrapper, null).position === 'static'
  let wrapperRect = getRect(this.wrapper)
  this.wrapperWidth = wrapperRect.width
  this.wrapperHeight = wrapperRect.height

  let scrollerRect = getRect(this.scroller)
  this.scrollerWidth = Math.round(scrollerRect.width * this.scale)
  this.scrollerHeight = Math.round(scrollerRect.height * this.scale)

  this.relativeX = scrollerRect.left
  this.relativeY = scrollerRect.top

  if (isWrapperStatic) {
    this.relativeX -= wrapperRect.left
    this.relativeY -= wrapperRect.top
  }

  this.minScrollX = 0
  this.minScrollY = 0

  this.maxScrollX = this.wrapperWidth - this.scrollerWidth
  if (!this.options.infinity) {
    this.maxScrollY = this.wrapperHeight - this.scrollerHeight
  }
  if (this.maxScrollX < 0) {
    this.maxScrollX -= this.relativeX
    this.minScrollX = -this.relativeX
  } else if (this.scale > 1) {
    this.maxScrollX = (this.maxScrollX / 2 - this.relativeX)
    this.minScrollX = this.maxScrollX
  }
  if (this.maxScrollY < 0) {
    this.maxScrollY -= this.relativeY
    this.minScrollY = -this.relativeY
  } else if (this.scale > 1) {
    this.maxScrollY = (this.maxScrollY / 2 - this.relativeY)
    this.minScrollY = this.maxScrollY
  }
  

  this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < this.minScrollX
  this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < this.minScrollY

  if (!this.hasHorizontalScroll) {
    this.maxScrollX = this.minScrollX
    this.scrollerWidth = this.wrapperWidth
  }

  if (!this.hasVerticalScroll) {
    this.maxScrollY = this.minScrollY
    this.scrollerHeight = this.wrapperHeight
  }

  this.endTime = 0
  this.directionX = 0
  this.directionY = 0
  this.wrapperOffset = offset(this.wrapper)

  this.trigger('refresh')

}
export default BScroll