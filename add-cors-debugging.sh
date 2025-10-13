#!/bin/bash
# add-cors-debugging.sh - Add CORS debugging to services
# Usage: ./add-cors-debugging.sh

echo -e "\033[1;34m╔════════════════════════════════════════════════════════════════════╗\033[0m"
echo -e "\033[1;34m║                 ADD CORS DEBUGGING TO SERVICES                     ║\033[0m"
echo -e "\033[1;34m╚════════════════════════════════════════════════════════════════════╝\033[0m"

# Define services and their app.ts locations
COMMUNICATION_SERVICE_APP="backend/services/communication-service/src/app.ts"
NOTIFICATION_SERVICE_APP="backend/services/notification-service/src/app.ts"

# CORS debugging code to add
CORS_DEBUG_CODE="
    // CORS debugging logs
    console.log('----------------------------------------');
    console.log('CORS CONFIGURATION DEBUGGING');
    console.log('----------------------------------------');
    console.log('Environment variables:');
    console.log('- ALLOWED_ORIGINS:', process.env.ALLOWED_ORIGINS);
    console.log('- CORS_ORIGINS:', process.env.CORS_ORIGINS);
    console.log('- CORS_ORIGIN:', process.env.CORS_ORIGIN);
    console.log('Configured allowed origins:');
    console.log(allowedOrigins);
    console.log('----------------------------------------');"

# Function to add debugging code to a service
add_debugging() {
    local file=$1
    local service_name=$2
    
    echo -e "\n\033[1;36m→ Adding CORS debugging to $service_name...\033[0m"
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo -e "\033[1;31m✗ File not found: $file\033[0m"
        return 1
    fi
    
    # Backup original file
    cp "$file" "${file}.bak"
    echo -e "\033[1;32m✓ Created backup: ${file}.bak\033[0m"
    
    # Find the CORS middleware setup line
    local cors_line=$(grep -n "app.use(cors(" "$file" | cut -d: -f1)
    
    if [ -z "$cors_line" ]; then
        echo -e "\033[1;31m✗ Could not find CORS middleware setup in $file\033[0m"
        return 1
    fi
    
    # Insert debugging code before the CORS middleware setup
    awk -v line="$cors_line" -v debug="$CORS_DEBUG_CODE" '{
        print $0;
        if (NR == line - 1) {
            print debug;
        }
    }' "${file}.bak" > "$file"
    
    echo -e "\033[1;32m✓ Added CORS debugging to $service_name\033[0m"
    echo -e "\033[1;33m⚠ Remember to commit and deploy these changes\033[0m"
}

# Add debugging to Communication Service
add_debugging "$COMMUNICATION_SERVICE_APP" "Communication Service"

# Add debugging to Notification Service
add_debugging "$NOTIFICATION_SERVICE_APP" "Notification Service"

echo -e "\n\033[1;32m✓ CORS debugging added to both services\033[0m"
echo -e "\033[1;33m⚠ Next steps:\033[0m"
echo -e "  1. Commit these changes: git add . && git commit -m 'Add CORS debugging'"
echo -e "  2. Push to GitHub: git push"
echo -e "  3. Redeploy using force-redeploy.sh"
echo -e "  4. Check Railway logs for the debugging output"