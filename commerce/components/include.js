document.addEventListener("DOMContentLoaded", async () => {
  const includeElements = Array.from(document.querySelectorAll("[data-include]"))

  await Promise.allSettled(
    includeElements.map(async el => {
      const res = await fetch(el.dataset.include)
      if (!res.ok) throw new Error(`Failed to load include: ${el.dataset.include}`)
      const html = await res.text()

      const doc = new DOMParser().parseFromString(html, "text/html")
      const fragment = document.createDocumentFragment()
      while (doc.body.firstChild) fragment.appendChild(doc.body.firstChild)

      el.replaceWith(fragment)
    })
  )

  const application = Stimulus.Application.start()
  application.register("navbar", NavbarController)
  application.register("slider", SliderController)
})
