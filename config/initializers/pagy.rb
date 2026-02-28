# frozen_string_literal: true
#
# Pagy — JoyMatcher Pagination Configuration
# Based on: docs/Design System/design_system.md
#
# Pagy outputs HTML with CSS classes; we style via .pagy classes in application.css
# See: https://ddnexus.github.io/pagy/docs/api/pagy/
#

# =========================================================
# Core Defaults
# =========================================================

# Items per page (sensible defaults per page type)
Pagy::DEFAULT[:limit] = 12          # Discover grid (3 cols x 4 rows)

# Number of navigation pages to show around current page
Pagy::DEFAULT[:ends]  = 1           # Always show first/last page
Pagy::DEFAULT[:size]  = 5           # Pages shown in nav window

# Link extras
Pagy::DEFAULT[:link_extra] = ''     # No extra HTML on all links

# =========================================================
# I18n
# =========================================================
Pagy::DEFAULT[:locale] = 'en'

# =========================================================
# Overflow handling
# Redirect to last page when page exceeds total_pages
# =========================================================
# Pagy::DEFAULT[:overflow] = :last_page

# =========================================================
# Searchkick / ElasticSearch (if added later)
# =========================================================
# require 'pagy/extras/searchkick'

# =========================================================
# Metadata extra (JSON API responses)
# =========================================================
# require 'pagy/extras/metadata'

# =========================================================
# Trim extra (remove page=1 from URL)
# =========================================================
require 'pagy/extras/trim'

# =========================================================
# Overflow extra (handle out-of-range pages gracefully)
# =========================================================
require 'pagy/extras/overflow'
Pagy::DEFAULT[:overflow] = :last_page
