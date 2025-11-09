package com.comeondost.app;

import android.os.Bundle;
import android.webkit.WebView;
import androidx.appcompat.widget.Toolbar;
import com.getcapacitor.BridgeActivity;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class MainActivity extends BridgeActivity {
    
    private static final String NAVIGATION_EVENT = "navigation";
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // Important: Capacitor needs to initialize first, then we add our UI
        setupCustomUI();
        
        // Enable WebView debugging for Chrome DevTools
        WebView.setWebContentsDebuggingEnabled(true);
    }
    
    private void setupCustomUI() {
        // Set custom layout with AppBar and Bottom Navigation
        setContentView(R.layout.activity_main);
        
        // Setup Top App Bar
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setTitle("Come On Dost");
            getSupportActionBar().setDisplayShowHomeEnabled(true);
        }
        
        // Setup Bottom Navigation
        BottomNavigationView bottomNav = findViewById(R.id.bottom_navigation);
        bottomNav.setOnItemSelectedListener(item -> {
            handleBottomNavigation(item.getItemId());
            return true;
        });
    }
    
    private void handleBottomNavigation(int itemId) {
        String route = "";
        
        if (itemId == R.id.nav_home) {
            route = "/";
        } else if (itemId == R.id.nav_search) {
            route = "/search";
        } else if (itemId == R.id.nav_messages) {
            route = "/messaging";
        } else if (itemId == R.id.nav_profile) {
            route = "/profile";
        }
        
        // Execute JavaScript to navigate
        if (!route.isEmpty()) {
            final String navigationScript = "window.location.href = '" + route + "';";
            getBridge().getWebView().post(() -> {
                getBridge().getWebView().evaluateJavascript(navigationScript, null);
            });
        }
    }
}
