document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(async el => {
    const res = await fetch(el.dataset.include)
    const html = await res.text()
    el.outerHTML = html
  })
})
