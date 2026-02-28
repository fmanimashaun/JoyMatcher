// Accordion Controller
// Usage: data-controller="accordion"
// Targets: item, button, panel, icon
// Values: allowMultiple (Boolean)

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["item", "button", "panel", "icon"]
  static values = { allowMultiple: Boolean }

  toggle(event) {
    const button = event.currentTarget
    const index = parseInt(button.dataset.itemIndex)
    const panel = this.panelTargets[index]
    const icon = this.iconTargets[index]
    const isExpanded = button.getAttribute("aria-expanded") === "true"

    if (!this.allowMultipleValue && !isExpanded) {
      // Close all other panels
      this.buttonTargets.forEach((btn, i) => {
        if (i !== index) {
          btn.setAttribute("aria-expanded", "false")
          this.panelTargets[i].hidden = true
          this.panelTargets[i].classList.add("hidden")
          this.iconTargets[i].style.transform = "rotate(0deg)"
        }
      })
    }

    // Toggle current panel
    button.setAttribute("aria-expanded", !isExpanded)
    panel.hidden = isExpanded
    panel.classList.toggle("hidden")
    icon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(180deg)"
  }

  handleKeydown(event) {
    const currentIndex = parseInt(event.currentTarget.dataset.itemIndex)
    const totalItems = this.buttonTargets.length

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault()
        const nextIndex = (currentIndex + 1) % totalItems
        this.buttonTargets[nextIndex].focus()
        break

      case "ArrowUp":
        event.preventDefault()
        const prevIndex = (currentIndex - 1 + totalItems) % totalItems
        this.buttonTargets[prevIndex].focus()
        break

      case "Home":
        event.preventDefault()
        this.buttonTargets[0].focus()
        break

      case "End":
        event.preventDefault()
        this.buttonTargets[totalItems - 1].focus()
        break
    }
  }
}
