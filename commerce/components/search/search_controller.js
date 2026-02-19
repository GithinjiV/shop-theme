class SearchController extends Stimulus.Controller {
  static targets = ["overlay", "input"]

  connect() {
    this.boundHandleEscape = this.handleEscape.bind(this)
    document.addEventListener("keydown", this.boundHandleEscape)
  }

  disconnect() {
    document.removeEventListener("keydown", this.boundHandleEscape)
  }

  open() {
    if (!this.hasOverlayTarget || !this.hasInputTarget) return
    this.overlayTarget.classList.add("active")
    document.body.style.overflow = "hidden"
    setTimeout(() => this.inputTarget.focus(), 100)
  }

  close() {
    if (!this.hasOverlayTarget || !this.hasInputTarget) return
    this.overlayTarget.classList.remove("active")
    document.body.style.overflow = ""
    this.inputTarget.value = ""
  }

  stopPropagation(event) {
    event.stopPropagation()
  }

  handleEscape(event) {
    if (event.key === "Escape") this.close()
  }
}
