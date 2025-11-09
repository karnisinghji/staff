#!/bin/bash
# Auto-refresh Azure login if expired
# Usage: source scripts/azure-auto-login.sh

check_azure_login() {
    az account show &>/dev/null
    return $?
}

if ! check_azure_login; then
    echo "⚠️  Azure session expired. Refreshing..."
    # Try to refresh token first (non-interactive)
    az account get-access-token &>/dev/null || {
        echo "🔑 Azure login required..."
        az login --use-device-code
    }
    echo "✅ Azure session refreshed!"
else
    echo "✅ Azure session active"
fi
