// Switch Controller
// Usage: data-controller="switch"

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["button", "thumb", "input"]

  toggle() {
    const isChecked = this.inputTarget.checked

    // Toggle checkbox
    this.inputTarget.checked = !isChecked

    // Update ARIA
    this.buttonTarget.setAttribute("aria-checked", !isChecked)

    // Update visual state
    if (!isChecked) {
      this.buttonTarget.classList.remove("bg-[hsla(320,25%,85%,1)]")
      this.buttonTarget.classList.add("bg-[#4D0052]")
      this.thumbTarget.classList.remove("translate-x-0")
      this.thumbTarget.classList.add("translate-x-5")
    } else {
      this.buttonTarget.classList.remove("bg-[#4D0052]")
      this.buttonTarget.classList.add("bg-[hsla(320,25%,85%,1)]")
      this.thumbTarget.classList.remove("translate-x-5")
      this.thumbTarget.classList.add("translate-x-0")
    }
  }
}
