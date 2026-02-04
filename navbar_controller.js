class NavbarController extends Stimulus.Controller {
  static targets = ["mobilePanel", "overlay", "hamburger", "accordion", "searchOverlay", "searchInput"]

  connect() {
    this.boundHandleEscape = this.handleEscape.bind(this)
    document.addEventListener("keydown", this.boundHandleEscape)
  }

  disconnect() {
    document.removeEventListener("keydown", this.boundHandleEscape)
  }

  toggle() {
    const isOpen = this.mobilePanelTarget.classList.contains("active")

    if (isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  open() {
    this.mobilePanelTarget.classList.add("active")
    this.overlayTarget.classList.add("active")
    this.hamburgerTarget.classList.add("active")
    document.body.style.overflow = "hidden"
  }

  close() {
    this.mobilePanelTarget.classList.remove("active")
    this.overlayTarget.classList.remove("active")
    this.hamburgerTarget.classList.remove("active")
    document.body.style.overflow = ""
  }

  openSearch() {
    this.searchOverlayTarget.classList.add("active")
    document.body.style.overflow = "hidden"
    setTimeout(() => {
      this.searchInputTarget.focus()
    }, 100)
  }

  closeSearch() {
    this.searchOverlayTarget.classList.remove("active")
    document.body.style.overflow = ""
    this.searchInputTarget.value = ""
  }

  stopPropagation(event) {
    event.stopPropagation()
  }

  handleEscape(event) {
    if (event.key === "Escape") {
      this.close()
      this.closeSearch()
    }
  }

  toggleAccordion(event) {
    const trigger = event.currentTarget
    const accordion = trigger.closest(".mobile-accordion")

    this.accordionTargets.forEach(acc => {
      if (acc !== accordion) {
        acc.classList.remove("active")
      }
    })

    accordion.classList.toggle("active")
  }
}
