# frozen_string_literal: true
#
# Pagy v43 — JoyMatcher Pagination Configuration
# See: https://ddnexus.github.io/pagy/resources/initializer/
#
# NOTE: Pagy v43 changed the API significantly:
#   - Pagy::DEFAULT is frozen (don't modify it)
#   - Pagy::OPTIONS is where we set custom defaults
#   - No more Pagy::Backend/Frontend — use Pagy::Method in controllers
#   - No more extras/ directory — features are built-in
#   - Helpers are instance methods on the pagy object (@pagy.series_nav)
#

# =========================================================
# Custom Defaults
# =========================================================

# Items per page: 12 matches 3-column discover grid (4 rows)
Pagy::OPTIONS[:limit] = 12

# Number of page links shown in nav (around current page)
Pagy::OPTIONS[:size]  = 5

# =========================================================
# Freeze options after configuration (required by v43)
# =========================================================
Pagy::OPTIONS.freeze
