package com.comeondost.app;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.os.Build;
import android.os.Bundle;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Enable WebView debugging for Chrome DevTools
        WebView.setWebContentsDebuggingEnabled(true);
        
        // Create notification channels for Android 8.0+
        createNotificationChannels();
    }
    
    private void createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            
            // Messages channel - High importance for new messages
            NotificationChannel messagesChannel = new NotificationChannel(
                "messages",
                "Messages",
                NotificationManager.IMPORTANCE_HIGH
            );
            messagesChannel.setDescription("New message notifications");
            messagesChannel.enableVibration(true);
            messagesChannel.enableLights(true);
            messagesChannel.setLightColor(0xFF1E40AF); // Blue color
            messagesChannel.setShowBadge(true);
            
            // Team Requests channel - Default importance
            NotificationChannel teamRequestsChannel = new NotificationChannel(
                "team_requests",
                "Team Requests",
                NotificationManager.IMPORTANCE_DEFAULT
            );
            teamRequestsChannel.setDescription("Team invitation notifications");
            teamRequestsChannel.enableVibration(true);
            teamRequestsChannel.setShowBadge(true);
            
            // Default channel - For other notifications
            NotificationChannel defaultChannel = new NotificationChannel(
                "default",
                "General Notifications",
                NotificationManager.IMPORTANCE_DEFAULT
            );
            defaultChannel.setDescription("General app notifications");
            defaultChannel.setShowBadge(true);
            
            // Register channels
            if (notificationManager != null) {
                notificationManager.createNotificationChannel(messagesChannel);
                notificationManager.createNotificationChannel(teamRequestsChannel);
                notificationManager.createNotificationChannel(defaultChannel);
            }
        }
    }
}

