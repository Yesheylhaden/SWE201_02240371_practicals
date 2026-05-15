# Expo Timer App with Notifications

A simple, elegant timer application built with Expo that sends push notifications when the timer expires.

## Features

✅ **Timer with Minutes & Seconds** - Set custom time duration
✅ **Start/Pause Controls** - Control timer execution
✅ **Reset Function** - Clear timer and cancel notifications
✅ **Local Notifications** - Get alerts when timer completes
✅ **Dark/Light Theme Support** - Automatic theme detection
✅ **Responsive UI** - Works on both iOS and Android

## Setup

### 1. Install Dependencies

The project already has expo-notifications installed. If not, run:

```bash
npx expo install expo-notifications
```

### 2. Run the App

```bash
npx expo start
```

Then:

- Press `a` for Android
- Press `i` for iOS
- Press `w` for Web

## How to Use

1. **Add Time**:
   - Click "+ 1 min" to add minutes
   - Click "+ 1 sec" to add seconds
   - (Only possible when timer is paused/stopped)

2. **Start Timer**: Click the "Start" button to begin the countdown

3. **Pause**: Click "Pause" to temporarily stop the timer

4. **Reset**: Click "Reset" to stop and clear the timer

5. **Notification**: When timer reaches 0, you'll receive:
   - A push notification alert
   - An on-screen alert
   - Sound and vibration (Android only)

## Project Structure

```
LocalNotification/
├── app/
│   ├── _layout.tsx          # Root layout with notification setup
│   ├── index.tsx            # Redirect to timer
│   ├── timer.tsx            # Main timer screen
│   ├── (tabs)/              # Tab navigation (optional)
│   └── modal.tsx            # Modal screen (optional)
├── utils/
│   └── notifications.ts     # Notification utilities and permissions
├── app.json                 # Expo config
└── package.json             # Dependencies
```

## Key Components

### `notifications.ts`

Handles all notification logic:

- `requestNotificationPermissions()` - Requests user permission
- `sendTimerNotification()` - Sends notification when timer expires
- `cancelAllNotifications()` - Clears pending notifications

### `timer.tsx`

Main timer screen with:

- Circular timer display (MM:SS format)
- Input controls to add time
- Start/Pause and Reset buttons
- Status indicator

### `_layout.tsx`

Root layout that:

- Initializes notifications on app start
- Sets up notification listeners
- Handles user tap on notifications

## Customization

### Change Default Timer

In `app/timer.tsx`, line 16:

```typescript
const [totalSeconds, setTotalSeconds] = useState(60); // Change to desired seconds
```

### Customize Notification

In `utils/notifications.ts`:

```typescript
export async function sendTimerNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Your custom title",
      body: "Your custom message",
      sound: "default",
      badge: 1,
    },
    trigger: null,
  });
}
```

### Android Notification Channel

Customize Android notification appearance in `utils/notifications.ts`:

```typescript
await Notifications.setNotificationChannelAsync("default", {
  name: "default",
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: "#FF231F7C", // Change color
});
```

## Requirements

- Node.js 16+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or physical device)

## Testing Notifications

### On iOS Simulator:

Notifications should appear in the notification center when timer completes.

### On Android Emulator:

1. Emulator should have Google Play Services
2. Enable notification permission when prompted
3. Notification will appear in the notification drawer

### On Physical Device:

- Grant notification permission when prompted
- App must be running for foreground notifications
- Lock the device to see full notifications

## Troubleshooting

**Notifications not appearing?**

- Check that notification permission is granted
- For Android, ensure notification channel is configured
- Verify app is running and notifications aren't disabled

**Timer not counting down?**

- Check that device has network connection
- Ensure app has focus (not in background)

## License

MIT

## Support

For more info on Expo Notifications:
https://docs.expo.dev/versions/latest/sdk/notifications/
