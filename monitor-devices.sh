#!/bin/bash
# Monitor device registrations in real-time

echo "📱 Monitoring device registrations..."
echo "Watching database for new device tokens..."
echo ""

# Watch the database for changes
while true; do
  psql contractor_worker_platform -c "
    SELECT 
      user_id,
      platform,
      LEFT(fcm_token, 20) as token_preview,
      device_info->'model' as model,
      TO_CHAR(updated_at, 'HH24:MI:SS') as last_updated
    FROM device_tokens
    ORDER BY updated_at DESC
    LIMIT 5;
  " 2>/dev/null
  
  echo ""
  echo "Press Ctrl+C to stop monitoring"
  sleep 5
  clear
  echo "📱 Monitoring device registrations..."
  echo "Watching database for new device tokens..."
  echo ""
done
