import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = [
    "card",
    "modal",
    "modalImage",
    "modalLookTitle",
    "modalMeta",
    "modalItems",
    "addAllButton"
  ]

  connect() {
    this.activeIndex = 0
    this.syncFromIndex(this.normalizeIndex(0))
  }

  open(event) {
    const clickedCard = event.currentTarget
    const index = this.cardTargets.indexOf(clickedCard)
    if (index < 0) return
    this.activeIndex = this.normalizeIndex(index)
    this.syncFromIndex(this.activeIndex)
    this.modalTarget.classList.add("is-open")
    this.modalTarget.setAttribute("aria-hidden", "false")
    document.body.classList.add("sal-modal-open")
  }

  close() {
    this.modalTarget.classList.remove("is-open")
    this.modalTarget.setAttribute("aria-hidden", "true")
    document.body.classList.remove("sal-modal-open")
  }

  prev() {
    this.activeIndex = this.normalizeIndex(this.activeIndex - 1)
    this.syncFromIndex(this.activeIndex)
  }

  next() {
    this.activeIndex = this.normalizeIndex(this.activeIndex + 1)
    this.syncFromIndex(this.activeIndex)
  }

  backdropClose(event) {
    if (event.target === this.modalTarget) this.close()
  }

  syncFromIndex(index) {
    const card = this.cardTargets[this.normalizeIndex(index)]
    if (!card) return

    const image = card.dataset.lookImage || ""
    const title = card.dataset.lookTitle || "Shop This Look"
    const meta = card.dataset.lookMeta || ""
    const template = card.querySelector("template")

    this.modalImageTarget.src = image
    this.modalImageTarget.alt = title
    this.modalLookTitleTarget.textContent = title
    this.modalMetaTarget.textContent = meta
    this.modalItemsTarget.innerHTML = template ? template.innerHTML : ""
    this.addAllButtonTarget.dataset.lookSlug = card.dataset.lookSlug || ""
  }

  normalizeIndex(index) {
    const total = this.cardTargets.length
    if (!total) return 0
    return ((index % total) + total) % total
  }
}
