import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["marqueeTrack", "cartOverlay", "cartDrawer", "mobileBackdrop", "mobileSearchPanel", "searchInput"]

  connect() {
    if (this.hasMarqueeTrackTarget) {
      const track = this.marqueeTrackTarget
      const items = track.querySelector(".marquee-items")
      if (items) {
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

    const mobileNav = document.getElementById("mobileNavCollapse")
    if (mobileNav) {
      mobileNav.addEventListener("show.bs.collapse", () => {
        this.mobileBackdropTarget.classList.add("active")
        this.mobileSearchPanelTarget.classList.remove("active")
      })
      mobileNav.addEventListener("hide.bs.collapse", () => {
        this.mobileBackdropTarget.classList.remove("active")
      })

      mobileNav.querySelectorAll(".collapse").forEach(el => {
        el.addEventListener("show.bs.collapse", () => {
          const trigger = document.querySelector(`[data-target="#${el.id}"]`)
          trigger?.querySelector(".bi-chevron-down")?.classList.add("chevron-open")
        })
        el.addEventListener("hide.bs.collapse", () => {
          const trigger = document.querySelector(`[data-target="#${el.id}"]`)
          trigger?.querySelector(".bi-chevron-down")?.classList.remove("chevron-open")
        })
      })
    }
  }

  openSearch(event) {
    event.preventDefault()
    const mobileNav = document.getElementById("mobileNavCollapse")
    if (mobileNav && mobileNav.classList.contains("show")) {
      $(mobileNav).collapse("hide")
    }
    this.mobileSearchPanelTarget.classList.add("active")
    this.searchInputTarget.focus()
  }

  closeSearch() {
    this.mobileSearchPanelTarget.classList.remove("active")
  }

  openCart(event) {
    event.preventDefault()
    this.cartOverlayTarget.classList.add("active")
    this.cartDrawerTarget.classList.add("open")
    document.body.style.overflow = "hidden"
  }

  closeCart() {
    this.cartOverlayTarget.classList.remove("active")
    this.cartDrawerTarget.classList.remove("open")
    document.body.style.overflow = ""
  }

  closeMobileMenu() {
    const mobileNav = document.getElementById("mobileNavCollapse")
    if (mobileNav) {
      $(mobileNav).collapse("hide")
    }
  }
}
