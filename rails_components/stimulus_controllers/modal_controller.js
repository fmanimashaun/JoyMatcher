// Modal Controller
// Usage: data-controller="modal"
// Targets: container
// Values: closeable, closeOnBackdrop, closeOnEscape

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["container"]
  static values = {
    closeable: Boolean,
    closeOnBackdrop: Boolean,
    closeOnEscape: Boolean
  }

  connect() {
    // Focus trap
    this.previousActiveElement = document.activeElement
    this.trapFocus()
  }

  disconnect() {
    // Restore focus
    if (this.previousActiveElement) {
      this.previousActiveElement.focus()
    }
  }

  open() {
    // Show modal
    this.element.classList.remove("hidden")

    // Prevent body scroll
    document.body.style.overflow = "hidden"

    // Animate in
    requestAnimationFrame(() => {
      this.containerTarget.classList.remove("scale-95", "opacity-0")
      this.containerTarget.classList.add("scale-100", "opacity-100")
    })

    // Set aria-hidden
    this.element.removeAttribute("aria-hidden")

    // Announce to screen readers
    const title = this.element.querySelector("h2")
    if (title) {
      title.setAttribute("tabindex", "-1")
      title.focus()
    }
  }

  close() {
    if (!this.closeableValue) return

    // Animate out
    this.containerTarget.classList.remove("scale-100", "opacity-100")
    this.containerTarget.classList.add("scale-95", "opacity-0")

    // Hide modal after animation
    setTimeout(() => {
      this.element.classList.add("hidden")
      this.element.setAttribute("aria-hidden", "true")
      document.body.style.overflow = ""
    }, 250)
  }

  closeOnBackdrop(event) {
    if (this.closeOnBackdropValue && event.target === this.element) {
      this.close()
    }
  }

  closeOnEscape() {
    if (this.closeOnEscapeValue) {
      this.close()
    }
  }

  stopPropagation(event) {
    event.stopPropagation()
  }

  trapFocus() {
    const focusableElements = this.element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    this.element.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    })
  }
}
