import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["stickyQty", "stickyAddButton"]

  connect() {
    this.sourceAddButton = document.querySelector("[data-sl-source-add]")
    this.sourceQtyInput = document.querySelector("[data-sl-source-qty]")
    this.sourceListing = document.querySelector(".sl-product-wrap")
    if (!this.sourceAddButton || !this.sourceQtyInput || !this.sourceListing) return

    this.isListingVisible = true
    this.hideSticky()
    this.syncStickyQty(this.sourceQtyInput.value)
    this.setupObserver()
    this.bindEvents()
    this.refreshVisibility()
  }

  disconnect() {
    if (this.observer) this.observer.disconnect()
    if (this.onScrollBound) window.removeEventListener("scroll", this.onScrollBound)
    if (this.onResizeBound) window.removeEventListener("resize", this.onResizeBound)
    if (this.onSourceQtyInputBound) this.sourceQtyInput?.removeEventListener("input", this.onSourceQtyInputBound)
    if (this.onSourceQtyChangeBound) this.sourceQtyInput?.removeEventListener("change", this.onSourceQtyChangeBound)
    if (this.onStickyQtyInputBound) this.stickyQtyTarget?.removeEventListener("input", this.onStickyQtyInputBound)
    if (this.onStickyQtyChangeBound) this.stickyQtyTarget?.removeEventListener("change", this.onStickyQtyChangeBound)
    if (this.onDocumentClickBound) document.removeEventListener("click", this.onDocumentClickBound)
    if (this.onStickyAddBound) this.stickyAddButtonTarget?.removeEventListener("click", this.onStickyAddBound)
  }

  setupObserver() {
    this.observer = new IntersectionObserver(
      entries => {
        this.isListingVisible = entries[0].isIntersecting
        this.refreshVisibility()
      },
      { threshold: 0.12 }
    )
    this.observer.observe(this.sourceListing)
  }

  bindEvents() {
    this.onScrollBound = () => this.refreshVisibility()
    this.onResizeBound = () => this.refreshVisibility()
    window.addEventListener("scroll", this.onScrollBound, { passive: true })
    window.addEventListener("resize", this.onResizeBound)

    this.onSourceQtyInputBound = () => this.syncStickyQty(this.sourceQtyInput.value)
    this.onSourceQtyChangeBound = () => this.syncStickyQty(this.sourceQtyInput.value)
    this.sourceQtyInput.addEventListener("input", this.onSourceQtyInputBound)
    this.sourceQtyInput.addEventListener("change", this.onSourceQtyChangeBound)

    this.onDocumentClickBound = event => {
      const stepButton = event.target.closest("[data-sl-qty-step]")
      if (!stepButton) return
      const delta = parseInt(stepButton.dataset.slQtyStep, 10)
      if (!Number.isFinite(delta)) return
      const qtyInput = stepButton.closest(".sl-sticky-cart__qty")
        ? this.stickyQtyTarget
        : this.sourceQtyInput
      this.updateQty(qtyInput, delta)
    }
    document.addEventListener("click", this.onDocumentClickBound)

    this.onStickyAddBound = () => this.sourceAddButton.click()
    this.stickyAddButtonTarget.addEventListener("click", this.onStickyAddBound)

    this.onStickyQtyInputBound = () => this.syncSourceQty(this.stickyQtyTarget.value)
    this.onStickyQtyChangeBound = () => this.syncSourceQty(this.stickyQtyTarget.value)
    this.stickyQtyTarget.addEventListener("input", this.onStickyQtyInputBound)
    this.stickyQtyTarget.addEventListener("change", this.onStickyQtyChangeBound)
  }

  updateQty(input, delta) {
    const min = parseInt(input.min || "1", 10)
    const base = parseInt(input.value || `${min}`, 10)
    const next = Math.max(min, base + delta)
    input.value = next

    if (input === this.sourceQtyInput) {
      this.syncStickyQty(next)
      this.sourceQtyInput.dispatchEvent(new Event("input", { bubbles: true }))
      this.sourceQtyInput.dispatchEvent(new Event("change", { bubbles: true }))
    } else {
      this.sourceQtyInput.value = next
      this.sourceQtyInput.dispatchEvent(new Event("input", { bubbles: true }))
      this.sourceQtyInput.dispatchEvent(new Event("change", { bubbles: true }))
      this.syncStickyQty(next)
    }
  }

  syncStickyQty(value) {
    const min = parseInt(this.stickyQtyTarget.min || "1", 10)
    const parsed = parseInt(value || `${min}`, 10)
    const safe = Number.isFinite(parsed) ? Math.max(min, parsed) : min
    this.stickyQtyTarget.value = safe
  }

  syncSourceQty(value) {
    const min = parseInt(this.sourceQtyInput.min || "1", 10)
    const parsed = parseInt(value || `${min}`, 10)
    const safe = Number.isFinite(parsed) ? Math.max(min, parsed) : min
    this.sourceQtyInput.value = safe
    this.syncStickyQty(safe)
    this.sourceQtyInput.dispatchEvent(new Event("input", { bubbles: true }))
    this.sourceQtyInput.dispatchEvent(new Event("change", { bubbles: true }))
  }

  refreshVisibility() {
    if (!this.sourceListing) return

    const listingRect = this.sourceListing.getBoundingClientRect()
    const outOfView = listingRect.bottom <= 0 || listingRect.top >= window.innerHeight || !this.isListingVisible
    if (outOfView) {
      this.showSticky()
    } else {
      this.hideSticky()
    }
  }

  showSticky() {
    this.element.classList.add("is-visible")
    this.element.setAttribute("aria-hidden", "false")
  }

  hideSticky() {
    this.element.classList.remove("is-visible")
    this.element.setAttribute("aria-hidden", "true")
  }
}
