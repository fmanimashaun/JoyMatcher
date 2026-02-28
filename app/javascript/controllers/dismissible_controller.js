// Dismissible Controller
// Usage: data-controller="dismissible"
// For alerts, banners, etc.

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  dismiss() {
    // Fade out animation
    this.element.style.opacity = "0"
    this.element.style.transform = "translateY(-10px)"
    this.element.style.transition = "all 250ms ease-out"

    // Remove from DOM after animation
    setTimeout(() => {
      this.element.remove()
    }, 250)
  }
}
