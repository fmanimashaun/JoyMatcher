// Toast Controller
// Usage: data-controller="toast"

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["item"]

  connect() {
    this.toasts = []
  }

  show({
    variant = 'info',
    title = null,
    message = '',
    duration = 5000,
    dismissible = true,
    action_text = null,
    action_href = null
  }) {
    const template = document.getElementById('toast-template')
    const toast = template.content.cloneNode(true).querySelector('.toast')

    const variants = {
      success: {
        border: 'border-l-[#8B7AA8]',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />',
        iconColor: 'text-[#8B7AA8]'
      },
      error: {
        border: 'border-l-[#F16A6F]',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />',
        iconColor: 'text-[#F16A6F]'
      },
      warning: {
        border: 'border-l-[#E8A87C]',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />',
        iconColor: 'text-[#E8A87C]'
      },
      info: {
        border: 'border-l-[#5B4A8E]',
        icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />',
        iconColor: 'text-[#5B4A8E]'
      }
    }

    const variantStyle = variants[variant] || variants.info

    toast.classList.add(variantStyle.border)
    const icon = toast.querySelector('.toast-icon')
    icon.innerHTML = variantStyle.icon
    icon.classList.add(variantStyle.iconColor)

    const titleEl = toast.querySelector('.toast-title')
    const messageEl = toast.querySelector('.toast-message')

    if (title) {
      titleEl.textContent = title
    } else {
      titleEl.remove()
    }

    messageEl.textContent = message

    if (!dismissible) {
      toast.querySelector('.toast-close').remove()
    }

    if (action_text && action_href) {
      const actionEl = toast.querySelector('.toast-action')
      actionEl.classList.remove('hidden')
      const actionLink = actionEl.querySelector('a')
      actionLink.textContent = action_text
      actionLink.href = action_href
    }

    this.element.appendChild(toast)
    this.toasts.push(toast)

    requestAnimationFrame(() => {
      toast.classList.remove('translate-x-full', 'opacity-0')
      toast.classList.add('translate-x-0', 'opacity-100')
    })

    if (duration > 0) {
      setTimeout(() => {
        this.dismissToast(toast)
      }, duration)
    }

    return toast
  }

  dismiss(event) {
    const toast = event.currentTarget.closest('.toast')
    this.dismissToast(toast)
  }

  dismissToast(toast) {
    toast.classList.remove('translate-x-0', 'opacity-100')
    toast.classList.add('translate-x-full', 'opacity-0')

    setTimeout(() => {
      toast.remove()
      this.toasts = this.toasts.filter(t => t !== toast)
    }, 300)
  }
}
