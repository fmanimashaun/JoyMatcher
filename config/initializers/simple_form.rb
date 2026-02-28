# frozen_string_literal: true
#
# Simple Form — JoyMatcher Tailwind CSS v4 Configuration
# Based on: docs/Design System/design_system.md + app/views/forms/ components
#
# Design tokens:
#   Font:    Georgia serif (--font-family-jm)
#   Primary: #4D0052 (deep purple)
#   Accent:  #F16A6F (coral)
#   Border:  hsla(320, 25%, 85%, 1)
#   Focus:   hsla(320, 35%, 75%, 1) + rgba(77,0,82,0.12) ring
#   Error:   #F16A6F
#   Success: #8B7AA8
#

SimpleForm.setup do |config|
  # =========================================================
  # JoyMatcher Default Wrapper
  # Full-width field group: label → input → hint → error
  # Matches form-group pattern from design system
  # =========================================================
  config.wrappers :jm_default,
    tag: :div,
    class: 'form-group mb-5',
    hint_class: 'field_with_hint',
    error_class: 'field_with_errors',
    valid_class: 'field_without_errors' do |b|

    b.use :html5
    b.use :placeholder

    b.optional :maxlength
    b.optional :minlength
    b.optional :pattern
    b.optional :min_max
    b.optional :readonly

    b.use :label,
          class: 'form-label block text-sm font-semibold text-[hsla(320,50%,15%,1)] mb-1'

    b.use :input,
          class: 'form-input w-full px-4 py-3 bg-white border border-[hsla(320,25%,85%,1)] rounded-xl text-base text-[hsla(320,50%,15%,1)] placeholder:text-[hsla(320,15%,70%,1)] transition-all duration-150 focus:outline-none focus:border-[#7D3365] focus:ring-2 focus:ring-[#4D0052]/20',
          error_class: 'border-[#F16A6F] focus:border-[#F16A6F] focus:ring-[#F16A6F]/20',
          valid_class: 'border-[#8B7AA8] focus:border-[#8B7AA8] focus:ring-[#8B7AA8]/20'

    b.use :hint,
          wrap_with: { tag: :p, class: 'form-hint text-xs text-[hsla(320,30%,35%,1)] mt-1' }

    b.use :error,
          wrap_with: { tag: :p, class: 'form-error text-xs text-[#F16A6F] mt-1 flex items-center gap-1' }
  end

  # =========================================================
  # Floating Label Wrapper (for compact forms)
  # =========================================================
  config.wrappers :jm_inline,
    tag: :div,
    class: 'flex items-center gap-4',
    hint_class: 'field_with_hint',
    error_class: 'field_with_errors' do |b|

    b.use :html5
    b.use :placeholder

    b.optional :maxlength
    b.optional :min_max
    b.optional :readonly

    b.use :label, class: 'text-sm font-semibold text-[hsla(320,50%,15%,1)] whitespace-nowrap'
    b.use :input,
          class: 'flex-1 form-input px-4 py-3 bg-white border border-[hsla(320,25%,85%,1)] rounded-xl text-base focus:outline-none focus:border-[#7D3365] focus:ring-2 focus:ring-[#4D0052]/20',
          error_class: 'border-[#F16A6F]',
          valid_class: 'border-[#8B7AA8]'

    b.use :error, wrap_with: { tag: :p, class: 'text-xs text-[#F16A6F]' }
  end

  # =========================================================
  # Boolean / Checkbox Wrapper
  # Side-by-side: checkbox + label
  # =========================================================
  config.wrappers :jm_checkbox,
    tag: :div,
    class: 'flex items-start gap-3 mb-4' do |b|

    b.use :html5

    b.use :input,
          class: 'w-5 h-5 mt-0.5 rounded border-2 border-[hsla(320,25%,85%,1)] text-[#4D0052] focus:ring-2 focus:ring-[#4D0052]/20 focus:ring-offset-0 transition-all duration-150 cursor-pointer'

    b.use :label, class: 'text-sm text-[hsla(320,30%,35%,1)] cursor-pointer leading-[1.6]'

    b.use :hint,  wrap_with: { tag: :p, class: 'text-xs text-[hsla(320,30%,35%,1)] mt-1' }
    b.use :error, wrap_with: { tag: :p, class: 'text-xs text-[#F16A6F] mt-1' }
  end

  # =========================================================
  # Radio Group Wrapper
  # =========================================================
  config.wrappers :jm_radio,
    tag: :div,
    class: 'flex items-center gap-3 mb-3' do |b|

    b.use :html5

    b.use :input,
          class: 'w-5 h-5 border-2 border-[hsla(320,25%,85%,1)] text-[#4D0052] focus:ring-2 focus:ring-[#4D0052]/20 focus:ring-offset-0 transition-all duration-150 cursor-pointer'

    b.use :label, class: 'text-base text-[hsla(320,30%,35%,1)] cursor-pointer'

    b.use :hint,  wrap_with: { tag: :span, class: 'text-xs text-[hsla(320,30%,35%,1)]' }
    b.use :error, wrap_with: { tag: :span, class: 'text-xs text-[#F16A6F]' }
  end

  # =========================================================
  # Global SimpleForm Configuration
  # =========================================================

  # Default wrapper for all inputs
  config.default_wrapper = :jm_default

  # Use nested style for boolean (label wraps input) — changed to inline for JoyMatcher
  config.boolean_style = :nested

  # Wrapper mappings — use correct wrapper per input type
  config.wrapper_mappings = {
    boolean: :jm_checkbox,
    radio_buttons: :jm_radio,
    check_boxes: :jm_checkbox
  }

  # Button class — uses our btn-primary design system class
  config.button_class = 'btn btn-primary'

  # Error tag
  config.error_notification_tag = :div
  config.error_notification_class = 'alert alert-error mb-6'

  # Don't use browser HTML5 validations (handle server-side)
  config.browser_validations = false

  # Blank option for selects
  # config.include_blank = :unless_required

  # Label text format (include required marker)
  config.label_text = lambda { |label, required, explicit_label|
    explicit_label ? label : "#{label}#{required}"
  }

  # Map currency field to string input
  config.input_mappings = {
    /currency/ => :string,
    /amount/   => :decimal
  }

  # Enable discover new inputs in autoload path
  config.inputs_discovery = true
end
