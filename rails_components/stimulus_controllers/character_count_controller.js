// Character Count Controller
// Usage: data-controller="character-count"

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "counter"]

  connect() {
    this.update()
  }

  update() {
    const length = this.inputTarget.value.length
    const maxlength = this.inputTarget.getAttribute("maxlength")

    if (this.hasCounterTarget && maxlength) {
      this.counterTarget.textContent = `${length} / ${maxlength}`

      // Warning color when near limit
      if (length > maxlength * 0.9) {
        this.counterTarget.classList.add("text-[#E8A87C]")
      } else {
        this.counterTarget.classList.remove("text-[#E8A87C]")
      }

      // Error color when over limit
      if (length > maxlength) {
        this.counterTarget.classList.add("text-[#F16A6F]")
      } else {
        this.counterTarget.classList.remove("text-[#F16A6F]")
      }
    }
  }
}
