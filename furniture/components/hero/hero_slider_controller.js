import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["track", "dots"]

  connect() {
    this.current = 0
    this.slides = this.trackTarget.querySelectorAll(".hero-slide")
    this.total = this.slides.length
    this.interval = null

    if (!this.total) return

    this.buildDots()
    this.goTo(0)
    this.startAutoplay()
  }

  disconnect() {
    this.stopAutoplay()
    this.pauseAllVideos()
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
    this.syncSlideVideos()
    this.syncAutoplayState()
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
    if (!this.total) return
    if (this.activeSlideHasVisibleVideo()) return
    if (this.interval) return
    this.interval = setInterval(() => this.next(), 5000)
  }

  stopAutoplay() {
    clearInterval(this.interval)
  }

  resetAutoplay() {
    this.stopAutoplay()
    this.startAutoplay()
  }

  syncAutoplayState() {
    if (this.activeSlideHasVisibleVideo()) {
      this.stopAutoplay()
      return
    }

    if (!this.interval) {
      this.startAutoplay()
    }
  }

  syncSlideVideos() {
    this.slides.forEach((slide, slideIndex) => {
      slide.querySelectorAll("video").forEach(video => {
        const isVisibleMedia = video.offsetParent !== null
        const isActive = slideIndex === this.current && isVisibleMedia

        if (isActive) {
          const playPromise = video.play()
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {})
          }
          return
        }

        video.pause()
        video.currentTime = 0
      })
    })
  }

  pauseAllVideos() {
    this.slides.forEach(slide => {
      slide.querySelectorAll("video").forEach(video => {
        video.pause()
      })
    })
  }

  activeSlideHasVisibleVideo() {
    const activeSlide = this.slides[this.current]
    if (!activeSlide) return false
    return Array.from(activeSlide.querySelectorAll("video")).some(video => video.offsetParent !== null)
  }
}
