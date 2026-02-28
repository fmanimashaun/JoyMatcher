// File Upload Controller
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["dropzone", "input", "placeholder", "preview", "previewImage", "fileName"]
  static values = { maxSize: Number }

  dragOver(event) {
    event.preventDefault()
    this.dropzoneTarget.classList.add("border-[#4D0052]", "bg-[hsla(320,20%,98%,1)]")
  }

  dragLeave(event) {
    event.preventDefault()
    this.dropzoneTarget.classList.remove("border-[#4D0052]", "bg-[hsla(320,20%,98%,1)]")
  }

  drop(event) {
    event.preventDefault()
    this.dropzoneTarget.classList.remove("border-[#4D0052]", "bg-[hsla(320,20%,98%,1)]")
    const files = event.dataTransfer.files
    this.handleFiles({ target: { files } })
  }

  clickInput() {
    this.inputTarget.click()
  }

  handleFiles(event) {
    const files = event.target.files
    if (files.length === 0) return

    const file = files[0]
    const maxSize = this.maxSizeValue * 1024 * 1024 // Convert MB to bytes

    if (file.size > maxSize) {
      alert(`File size must be under ${this.maxSizeValue}MB`)
      return
    }

    // Show file name
    if (this.hasFileNameTarget) {
      this.fileNameTarget.textContent = file.name
      this.fileNameTarget.classList.remove("hidden")
    }

    // Show image preview
    if (this.hasPreviewTarget && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.previewImageTarget.src = e.target.result
        this.previewTarget.classList.remove("hidden")
        this.placeholderTarget.classList.add("hidden")
      }
      reader.readAsDataURL(file)
    }
  }
}
