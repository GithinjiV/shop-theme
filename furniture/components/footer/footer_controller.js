import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"

export default class extends Controller {
  static targets = ["chevron"]

  connect() {
    if (window.innerWidth >= 992) return
    const sections = this.element.querySelectorAll(".footer-section")
    sections.forEach((section, i) => {
      const body = section.querySelector(".footer-section-body")
      const chevron = section.querySelector("[data-footer-target='chevron']")
      if (i === 0) {
        body.classList.add("footer-open")
        if (chevron) chevron.classList.replace("bi-chevron-down", "bi-chevron-up")
      }
    })
  }

  toggle(event) {
    if (window.innerWidth >= 992) return
    const section = event.currentTarget.closest(".footer-section")
    const body = section.querySelector(".footer-section-body")
    const chevron = section.querySelector("[data-footer-target='chevron']")
    const isOpen = body.classList.contains("footer-open")

    this.element.querySelectorAll(".footer-section .footer-section-body").forEach(b => b.classList.remove("footer-open"))
    this.chevronTargets.forEach(c => c.classList.replace("bi-chevron-up", "bi-chevron-down"))

    if (!isOpen) {
      body.classList.add("footer-open")
      if (chevron) chevron.classList.replace("bi-chevron-down", "bi-chevron-up")
    }
  }
}
