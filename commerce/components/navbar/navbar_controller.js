class NavbarController extends Stimulus.Controller {
  connect() {
    this.hamburger    = this.element.querySelector(".hamburger")
    this.mobilePanel  = document.querySelector(".mobile-panel")
    this.overlay      = document.querySelector(".mobile-overlay")
    this.cartPanel    = document.querySelector(".cart-panel")
    this.cartOverlay  = document.querySelector(".cart-overlay")
    this.searchOverlay = document.querySelector(".search-overlay")
    this.searchInput  = document.querySelector(".search-input")

    this.boundHandleEscape = this.handleEscape.bind(this)
    document.addEventListener("keydown", this.boundHandleEscape)
  }

  disconnect() {
    document.removeEventListener("keydown", this.boundHandleEscape)
  }

  toggle() {
    this.mobilePanel.classList.contains("active") ? this.close() : this.open()
  }

  open() {
    this.mobilePanel.classList.add("active")
    this.overlay.classList.add("active")
    this.hamburger.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  close() {
    this.mobilePanel.classList.remove("active")
    this.overlay.classList.remove("active")
    this.hamburger.classList.remove("active")
    document.body.style.overflow = ""
  }

  openSearch() {
    this.searchOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
    setTimeout(() => this.searchInput.focus(), 100)
  }

  closeSearch() {
    this.searchOverlay.classList.remove("active")
    document.body.style.overflow = ""
    this.searchInput.value = ""
  }

  openCart() {
    this.cartOverlay.classList.add("active")
    this.cartPanel.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  closeCart() {
    this.cartOverlay.classList.remove("active")
    this.cartPanel.classList.remove("active")
    document.body.style.overflow = ""
  }

  stopPropagation(event) {
    event.stopPropagation()
  }

  handleEscape(event) {
    if (event.key === "Escape") {
      this.close()
      this.closeSearch()
      this.closeCart()
    }
  }

  toggleAccordion(event) {
    const accordion = event.currentTarget.closest(".mobile-accordion")
    document.querySelectorAll(".mobile-accordion").forEach(acc => {
      if (acc !== accordion) acc.classList.remove("active")
    })
    accordion.classList.toggle("active")
  }
}
