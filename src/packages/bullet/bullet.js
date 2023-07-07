
class BulletMask {
  $box = null
  $el = null
  config = {}
  
  tracks = []
  bulletStash = []

  constructor(htmlElement, options) {
    this.$box = htmlElement
    Object.assign(this.config, options)
    // create mask
    const el = this.$el = document.createElement('div')
    el.classList.add('bm-mask')
    const boxCsd = getComputedStyle(this.$box, null)
    document.head.append(document.createElement('style'))
    const css = document.styleSheets[0]
    css.insertRule(`.bm-mask { width: 100%; height: 100%; z-index: ${boxCsd.zIndex + 1}; background-color: rgba(0, 0, 0, 0) }`)
    console.debug(css)
    this.$box.append(el)

    // create track
    this.createTracks()
  }

  init() {

  }

  createTracks() {

  }
}

class BulletTrack {
  root = null
  $el = null

  constructor() {

  }
}

class BulletCell {

}

export function createBullet(parentElement, options) {
  return new BulletMask(parentElement, options)
}
