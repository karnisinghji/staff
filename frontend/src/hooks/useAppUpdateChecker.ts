import { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';

interface VersionInfo {
    current: string;
    latest: string;
    updateRequired: boolean;
    downloadUrl: string;
}

const CURRENT_VERSION = '1.0.0'; // Update this with each release
const DOWNLOAD_URL = 'https://raw.githubusercontent.com/karnisinghji/staff/main/contractor-platform.apk';

export function useAppUpdateChecker() {
    const [updateAvailable, setUpdateAvailable] = useState(false);
    const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);

    useEffect(() => {
        // Only check on native Android platform
        if (!Capacitor.isNativePlatform() || Capacitor.getPlatform() !== 'android') {
            return;
        }

        checkForUpdates();

        // Check every 30 minutes
        const interval = setInterval(checkForUpdates, 30 * 60 * 1000);

        return () => clearInterval(interval);
    }, []);

    const checkForUpdates = async () => {
        try {
            // Fetch version info from our server
            const response = await fetch(
                'https://raw.githubusercontent.com/karnisinghji/staff/main/frontend/package.json'
            );

            if (!response.ok) {
                console.warn('[UpdateChecker] Failed to fetch latest version');
                return;
            }

            const data = await response.json();
            const latestVersion = data.version || '1.0.0';

            console.log('[UpdateChecker] Current:', CURRENT_VERSION, 'Latest:', latestVersion);

            // Compare versions
            if (compareVersions(latestVersion, CURRENT_VERSION) > 0) {
                const info: VersionInfo = {
                    current: CURRENT_VERSION,
                    latest: latestVersion,
                    updateRequired: true,
                    downloadUrl: DOWNLOAD_URL
                };

                setVersionInfo(info);
                setUpdateAvailable(true);

                // Show native confirm dialog
                showUpdateDialog(info);
            }
        } catch (error) {
            console.error('[UpdateChecker] Error checking for updates:', error);
        }
    };

    const compareVersions = (v1: string, v2: string): number => {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);

        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const part1 = parts1[i] || 0;
            const part2 = parts2[i] || 0;

            if (part1 > part2) return 1;
            if (part1 < part2) return -1;
        }

        return 0;
    };

    const showUpdateDialog = (info: VersionInfo) => {
        const confirmed = window.confirm(
            `🔔 Update Available\n\n` +
            `A new version (${info.latest}) is available!\n\n` +
            `Current version: ${info.current}\n\n` +
            `This update includes:\n` +
            `• Push notifications for all users\n` +
            `• Bug fixes and improvements\n\n` +
            `Please update to continue receiving notifications.\n\n` +
            `Download now?`
        );

        if (confirmed) {
            // Open download URL in browser
            window.open(info.downloadUrl, '_system');
        }
    };

    const dismissUpdate = () => {
        setUpdateAvailable(false);
    };

    return {
        updateAvailable,
        versionInfo,
        checkForUpdates,
        dismissUpdate
    };
}
