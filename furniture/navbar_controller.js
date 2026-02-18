import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["marqueeTrack"]

  connect() {
    const track = this.marqueeTrackTarget
    const items = track.querySelector(".marquee-items")
    if (!items) return

    requestAnimationFrame(() => {
      const itemWidth = items.getBoundingClientRect().width
      const viewportWidth = window.innerWidth

      if (itemWidth <= viewportWidth) {
        track.classList.add("marquee-static")
        return
      }

      track.style.setProperty("--marquee-distance", `-${itemWidth}px`)
      track.style.animationPlayState = "running"
    })
  }
}
