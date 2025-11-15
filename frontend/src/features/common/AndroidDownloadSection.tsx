import React from 'react';
import { Smartphone, Download, CheckCircle, Shield } from 'lucide-react';

const AndroidDownloadSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Smartphone className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            📱 Download Android App
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get the full mobile experience with our native Android app - push notifications, GPS location, and real-time messaging!
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <a
              href="https://github.com/karnisinghji/staff/releases/download/v1.0.0/comeondost-v1.0.apk"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors shadow-lg hover:shadow-xl"
              download
            >
              <Download className="w-6 h-6" />
              Download APK (12 MB)
            </a>
            <p className="text-sm text-gray-500 mt-4">
              Version 1.0.1 • Updated November 15, 2025 (FCM Fix)
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Download className="w-5 h-5 text-blue-600" />
              How to Install:
            </h3>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  1
                </span>
                <div>
                  <p className="text-gray-900 font-medium">Click "Download APK" button above</p>
                  <p className="text-gray-600 text-sm">File will download directly (14 MB)</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  2
                </span>
                <div>
                  <p className="text-gray-900 font-medium">Open the downloaded APK file</p>
                  <p className="text-gray-600 text-sm">Check Downloads folder if needed</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  3
                </span>
                <div>
                  <p className="text-gray-900 font-medium">Enable "Install from Unknown Sources"</p>
                  <p className="text-gray-600 text-sm">
                    Settings → Security → Unknown Sources → ON<br />
                    <span className="text-xs">(Android 8+: Settings → Apps → Special Access → Install Unknown Apps)</span>
                  </p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                  4
                </span>
                <div>
                  <p className="text-gray-900 font-medium">Tap "Install" and follow prompts</p>
                  <p className="text-gray-600 text-sm">Installation takes just a few seconds</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6 flex gap-3">
            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-green-800">
                <strong>Safe & Secure:</strong> This app is built by us and scanned for safety. 
                Enable unknown sources only for this installation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Mobile Features
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2">
                <span className="text-blue-600">🔔</span>
                <span>Push Notifications - Instant message alerts</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">📍</span>
                <span>GPS Location - Auto-detect your location</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">💬</span>
                <span>Real-time Messaging - Chat instantly</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">👥</span>
                <span>Team Management - Invitations & requests</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              Requirements
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex gap-2">
                <span className="text-blue-600">📱</span>
                <span>Android 5.0+ (API 21+)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">💾</span>
                <span>14 MB storage space</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">🌐</span>
                <span>Internet connection</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600">🔔</span>
                <span>Google Play Services (for notifications)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Need help? Check our{' '}
            <a 
              href="https://github.com/karnisinghji/staff/blob/main/ANDROID_NOTIFICATION_TROUBLESHOOTING.md"
              className="text-blue-600 hover:text-blue-700 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              troubleshooting guide
            </a>
            {' '}or{' '}
            <a 
              href="https://github.com/karnisinghji/staff/issues"
              className="text-blue-600 hover:text-blue-700 font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              report an issue
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AndroidDownloadSection;
