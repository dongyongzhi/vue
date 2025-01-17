const spliceOne =function(list, index) {
  for (; index + 1 < list.length; index++) {
    list[index] = list[index + 1]
  }
  list.pop()
}

export function addEvent(el, type, fn, capture) {
  el.addEventListener(type, fn, {passive: false, capture: !!capture})
}

export function removeEvent(el, type, fn, capture) {
  el.removeEventListener(type, fn, {passive: false, capture: !!capture})
}

export function eventMixin(BScroll) {
  BScroll.prototype.on = function (type, fn, context = this) {
    if (!this._events[type]) {
      this._events[type] = []
    }

    this._events[type].push([fn, context])
  }

  BScroll.prototype.once = function (type, fn, context = this) {
    function magic() {
      this.off(type, magic)

      fn.apply(context, arguments)
    }
    // To expose the corresponding function method in order to execute the off method
    magic.fn = fn

    this.on(type, magic)
  }

  BScroll.prototype.off = function (type, fn) {
    let _events = this._events[type]
    if (!_events) {
      return
    }

    let count = _events.length
    while (count--) {
      if (_events[count][0] === fn || (_events[count][0] && _events[count][0].fn === fn)) {
        spliceOne(_events, count)
      }
    }
  }

  BScroll.prototype.trigger = function (type) {
    let events = this._events[type]
    if (!events) {
      return
    }

    let len = events.length
    let eventsCopy = [...events]
    for (let i = 0; i < len; i++) {
      let event = eventsCopy[i]
      let [fn, context] = event
      if (fn) {
        fn.apply(context, [].slice.call(arguments, 1))
      }
    }
  }
}
