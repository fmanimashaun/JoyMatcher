// Tooltip Controller
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["trigger", "content"]

  show() {
    this.contentTarget.classList.remove("hidden")
  }

  hide() {
    this.contentTarget.classList.add("hidden")
  }
}
