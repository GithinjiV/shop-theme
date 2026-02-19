class SliderController extends Stimulus.Controller {
  static targets = ["track"]

  connect() {
    this.isDown = false
    this.startX = 0
    this.scrollLeft = 0

    this.boundDown = this.pointerDown.bind(this)
    this.boundMove = this.pointerMove.bind(this)
    this.boundUp = this.pointerUp.bind(this)

    this.trackTarget.addEventListener("mousedown", this.boundDown)
    document.addEventListener("mousemove", this.boundMove)
    document.addEventListener("mouseup", this.boundUp)
  }

  disconnect() {
    this.trackTarget.removeEventListener("mousedown", this.boundDown)
    document.removeEventListener("mousemove", this.boundMove)
    document.removeEventListener("mouseup", this.boundUp)
  }

  pointerDown(e) {
    this.isDown = true
    this.startX = e.pageX - this.trackTarget.offsetLeft
    this.scrollLeft = this.trackTarget.scrollLeft
  }

  pointerMove(e) {
    if (!this.isDown) return
    e.preventDefault()
    const x = e.pageX - this.trackTarget.offsetLeft
    this.trackTarget.scrollLeft = this.scrollLeft - (x - this.startX)
  }

  pointerUp() {
    this.isDown = false
  }
}
