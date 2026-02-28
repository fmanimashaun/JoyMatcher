// Search Controller
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "clearButton"]

  handleInput() {
    if (this.hasClearButtonTarget) {
      if (this.inputTarget.value.length > 0) {
        this.clearButtonTarget.classList.remove("hidden")
      } else {
        this.clearButtonTarget.classList.add("hidden")
      }
    }
  }

  clear() {
    this.inputTarget.value = ""
    this.inputTarget.focus()
    if (this.hasClearButtonTarget) {
      this.clearButtonTarget.classList.add("hidden")
    }
  }
}
