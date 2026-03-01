import { Controller } from "@hotwired/stimulus"

// Handles: password strength indicator + dynamic pricing by country
export default class extends Controller {
  static targets = ["password", "strengthBar", "strengthFill", "strengthLabel",
                    "country", "pricingGrid", "email"]

  checkStrength() {
    const password = this.passwordTarget.value
    const strength = this.calculateStrength(password)

    if (this.hasStrengthBarTarget) {
      this.strengthBarTarget.style.display = password.length > 0 ? "block" : "none"
    }

    if (this.hasStrengthFillTarget) {
      const colors = ["#F16A6F", "#E8A87C", "#E8C97C", "#8B7AA8", "#4D0052"]
      const labels = ["Very weak", "Weak", "Fair", "Strong", "Very strong"]
      this.strengthFillTarget.style.width = `${(strength / 4) * 100}%`
      this.strengthFillTarget.style.backgroundColor = colors[strength]
      if (this.hasStrengthLabelTarget) {
        this.strengthLabelTarget.textContent = labels[strength]
      }
    }
  }

  calculateStrength(password) {
    let score = 0
    if (password.length >= 8)  score++
    if (password.length >= 12) score++
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return Math.min(score, 4)
  }

  updatePricing() {
    if (!this.hasCountryTarget) return
    const isNigerian = this.countryTarget.value === "NG"

    // Update pricing display (find elements by data-tier attributes)
    const pricingMap = {
      "free-ng":    isNigerian ? "₦0"      : "$0",
      "premium-ng": isNigerian ? "₦18,000" : "$18",
      "vip-ng":     isNigerian ? "₦200k+"  : "$200+"
    }

    Object.entries(pricingMap).forEach(([tier, price]) => {
      const el = document.querySelector(`[data-tier="${tier}"]`)
      if (el) el.textContent = price
    })
  }
}
