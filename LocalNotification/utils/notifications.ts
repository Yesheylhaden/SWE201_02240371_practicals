import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Request permissions
export async function requestNotificationPermissions() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

// Send notification
export async function sendTimerNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏰ Timer Alert!",
      body: "Your timer has finished!",
      sound: "default",
      badge: 1,
    },
    trigger: null, // Trigger immediately
  });
}

// Cancel all notifications
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
