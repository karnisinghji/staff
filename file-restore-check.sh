#!/bin/bash
# file-restore-check.sh - Validate and commit restored app.ts files

echo -e "\033[1;34m╔════════════════════════════════════════════════════════════════════╗\033[0m"
echo -e "\033[1;34m║         VALIDATE AND COMMIT RESTORED APP.TS FILES                  ║\033[0m"
echo -e "\033[1;34m╚════════════════════════════════════════════════════════════════════╝\033[0m"

# Check if files exist and have content
COMM_FILE="backend/services/communication-service/src/app.ts"
NOTIF_FILE="backend/services/notification-service/src/app.ts"

validate_file() {
    local file=$1
    local name=$2
    
    echo -e "\n\033[1;36m→ Checking $name file...\033[0m"
    
    if [ ! -f "$file" ]; then
        echo -e "\033[1;31m✗ File does not exist: $file\033[0m"
        return 1
    fi
    
    local size=$(wc -l < "$file")
    if [ $size -lt 50 ]; then
        echo -e "\033[1;31m✗ File seems too small ($size lines): $file\033[0m"
        return 1
    fi
    
    echo -e "\033[1;32m✓ $name file exists and has content ($size lines)\033[0m"
    return 0
}

# Validate files
validate_file "$COMM_FILE" "Communication Service"
comm_status=$?

validate_file "$NOTIF_FILE" "Notification Service"
notif_status=$?

if [ $comm_status -ne 0 ] || [ $notif_status -ne 0 ]; then
    echo -e "\n\033[1;31m✗ Validation failed! Please check the files.\033[0m"
    exit 1
fi

# Commit restored files
echo -e "\n\033[1;36m→ Committing restored files to repository...\033[0m"
git add "$COMM_FILE" "$NOTIF_FILE"
git commit -m "Restore app.ts files for Communication and Notification services"

echo -e "\n\033[1;32m✓ Files restored and committed\033[0m"
echo -e "\033[1;33m⚠ Next steps:\033[0m"
echo -e "  1. Push changes: git push"
echo -e "  2. Redeploy services: ./force-redeploy.sh"
echo -e "  3. Verify successful build in Railway"