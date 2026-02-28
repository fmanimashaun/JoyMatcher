// Tabs Controller
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["tab", "panel"]
  static values = { active: String }

  switch(event) {
    const clickedTab = event.currentTarget
    const tabId = clickedTab.dataset.tabId

    // Update tabs
    this.tabTargets.forEach(tab => {
      const isActive = tab.dataset.tabId === tabId
      tab.setAttribute("aria-selected", isActive)

      if (isActive) {
        tab.classList.add("border-[#4D0052]", "text-[#4D0052]")
        tab.classList.remove("border-transparent", "text-[hsla(320,30%,35%,1)]")
      } else {
        tab.classList.remove("border-[#4D0052]", "text-[#4D0052]")
        tab.classList.add("border-transparent", "text-[hsla(320,30%,35%,1)]")
      }
    })

    // Update panels
    this.panelTargets.forEach(panel => {
      const isActive = panel.dataset.panelId === tabId
      if (isActive) {
        panel.classList.remove("hidden")
      } else {
        panel.classList.add("hidden")
      }
    })
  }
}
