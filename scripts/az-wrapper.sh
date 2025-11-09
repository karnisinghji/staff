#!/bin/bash
# Azure command wrapper with auto-login
# Usage: ./scripts/az-wrapper.sh containerapp update --name matching-service ...

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Auto-login check
source "$SCRIPT_DIR/azure-auto-login.sh"

# Run the actual az command
az "$@"
