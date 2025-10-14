// Register Service Worker for PWA support
export function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

// Check if app can be installed (PWA installable)
export function checkPWAInstallable(callback) {
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    
    // Update UI notify the user they can add to home screen
    if (callback && typeof callback === 'function') {
      callback(true, deferredPrompt);
    }
  });
  
  // If app was successfully installed, clear the prompt
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    deferredPrompt = null;
    if (callback && typeof callback === 'function') {
      callback(false);
    }
  });
  
  // Check if already in standalone mode (PWA already installed)
  if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('App is running in standalone mode (PWA already installed)');
    if (callback && typeof callback === 'function') {
      callback(false);
    }
  }
}