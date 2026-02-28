// Tag Input Controller
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["input", "container"]
  static values = { max: Number }

  handleKeydown(event) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault()
      this.addTag()
    } else if (event.key === "Backspace" && this.inputTarget.value === "") {
      this.removeLastTag()
    }
  }

  addTag() {
    const value = this.inputTarget.value.trim()
    if (!value) return

    const tags = Array.from(this.containerTarget.querySelectorAll('input[type="hidden"]')).map(input => input.value)

    if (this.hasMaxValue && tags.length >= this.maxValue) {
      alert(`Maximum ${this.maxValue} tags allowed`)
      return
    }

    if (tags.includes(value)) {
      this.inputTarget.value = ""
      return
    }

    const tagHTML = `
      <div class="inline-flex items-center gap-1 px-3 py-1 bg-[#4D0052]/10 text-[#4D0052] rounded-full text-sm font-sans font-semibold">
        <span>${value}</span>
        <button type="button" data-action="click->tag-input#removeTag" data-value="${value}" class="p-0.5 hover:bg-[#4D0052]/20 rounded-full transition-colors">
          <iconify-icon icon="lucide:x" class="text-xs"></iconify-icon>
        </button>
        <input type="hidden" name="${this.inputTarget.dataset.name}" value="${value}">
      </div>
    `

    this.containerTarget.insertAdjacentHTML("beforeend", tagHTML)
    this.inputTarget.value = ""
  }

  removeTag(event) {
    event.target.closest("div").remove()
  }

  removeLastTag() {
    const tags = this.containerTarget.querySelectorAll("div")
    if (tags.length > 0) {
      tags[tags.length - 1].remove()
    }
  }
}
