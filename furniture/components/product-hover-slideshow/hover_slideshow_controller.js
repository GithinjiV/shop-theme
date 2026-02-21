import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["image"]
  static values = {
    images: String,
    interval: { type: Number, default: 1100 }
  }

  connect() {
    if (!this.hasImageTarget) return

    const srcList = (this.imagesValue || "")
      .split("|")
      .map(item => item.trim())
      .filter(Boolean)

    this.images = srcList.length ? srcList : [this.imageTarget.src]
    this.baseImage = this.images[0] || this.imageTarget.src
    this.currentIndex = 0
    this.timer = null
    this.isAnimating = false

    this.imageTarget.classList.add("phs-image", "phs-image--current")
    this.imageTarget.parentElement.classList.add("phs-stage")
    this.imageTarget.src = this.baseImage

    this.nextImage = document.createElement("img")
    this.nextImage.className = "phs-image phs-image--next"
    this.nextImage.alt = this.imageTarget.alt || ""
    this.nextImage.setAttribute("aria-hidden", "true")
    this.nextImage.src = this.baseImage
    this.imageTarget.parentElement.appendChild(this.nextImage)

    this.onEnter = () => this.start()
    this.onLeave = () => this.stop(true)
    this.onFocusIn = () => this.start()
    this.onFocusOut = () => this.stop(true)

    this.element.addEventListener("mouseenter", this.onEnter)
    this.element.addEventListener("mouseleave", this.onLeave)
    this.element.addEventListener("focusin", this.onFocusIn)
    this.element.addEventListener("focusout", this.onFocusOut)
  }

  disconnect() {
    this.stop(false)
    if (this.onEnter) this.element.removeEventListener("mouseenter", this.onEnter)
    if (this.onLeave) this.element.removeEventListener("mouseleave", this.onLeave)
    if (this.onFocusIn) this.element.removeEventListener("focusin", this.onFocusIn)
    if (this.onFocusOut) this.element.removeEventListener("focusout", this.onFocusOut)
    if (this.nextImage) this.nextImage.remove()
  }

  start() {
    if (!this.images || this.images.length < 2) return
    if (this.timer) return
    this.timer = setInterval(() => this.advance(), this.intervalValue)
  }

  stop(reset) {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }

    if (reset) {
      this.isAnimating = false
      this.imageTarget.parentElement.classList.remove("is-sliding")
      if (this.nextImage) this.nextImage.classList.remove("is-ready")
      this.currentIndex = 0
      this.swapImage(this.baseImage)
    }
  }

  advance() {
    if (this.isAnimating) return
    this.currentIndex = (this.currentIndex + 1) % this.images.length
    this.swapImage(this.images[this.currentIndex])
  }

  swapImage(nextSrc) {
    if (!nextSrc || this.imageTarget.src === nextSrc || !this.nextImage) return

    this.isAnimating = true
    this.nextImage.src = nextSrc
    this.nextImage.classList.add("is-ready")

    window.requestAnimationFrame(() => {
      this.imageTarget.parentElement.classList.add("is-sliding")
    })

    window.setTimeout(() => {
      this.imageTarget.src = nextSrc
      this.imageTarget.parentElement.classList.remove("is-sliding")
      this.nextImage.classList.remove("is-ready")
      this.isAnimating = false
    }, 320)
  }
}
