// Drawer Controller
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["panel"]

  open() {
    this.element.classList.remove("hidden")
    document.body.style.overflow = "hidden"

    requestAnimationFrame(() => {
      this.panelTarget.classList.remove("translate-x-full")
      this.panelTarget.classList.add("translate-x-0")
    })
  }

  close() {
    this.panelTarget.classList.remove("translate-x-0")
    this.panelTarget.classList.add("translate-x-full")

    setTimeout(() => {
      this.element.classList.add("hidden")
      document.body.style.overflow = ""
    }, 300)
  }
}
