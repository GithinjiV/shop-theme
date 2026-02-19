import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["track", "dots"]

  connect() {
    this.current = 0
    this.slides = this.trackTarget.querySelectorAll(".hero-slide")
    this.total = this.slides.length
    this.interval = null

    this.buildDots()
    this.goTo(0)
    this.startAutoplay()
  }

  disconnect() {
    this.stopAutoplay()
  }

  prev() {
    this.goTo((this.current - 1 + this.total) % this.total)
    this.resetAutoplay()
  }

  next() {
    this.goTo((this.current + 1) % this.total)
    this.resetAutoplay()
  }

  goTo(index) {
    this.current = index
    this.trackTarget.style.transform = `translateX(-${index * 100}%)`
    this.dotsTarget.querySelectorAll(".hero-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === index)
    })
  }

  buildDots() {
    this.dotsTarget.innerHTML = ""
    this.slides.forEach((_, i) => {
      const dot = document.createElement("button")
      dot.className = "hero-dot"
      dot.addEventListener("click", () => {
        this.goTo(i)
        this.resetAutoplay()
      })
      this.dotsTarget.appendChild(dot)
    })
  }

  startAutoplay() {
    this.interval = setInterval(() => this.next(), 5000)
  }

  stopAutoplay() {
    clearInterval(this.interval)
  }

  resetAutoplay() {
    this.stopAutoplay()
    this.startAutoplay()
  }
}
