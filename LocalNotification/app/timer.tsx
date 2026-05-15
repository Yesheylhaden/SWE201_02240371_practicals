import { useColorScheme } from "@/hooks/use-color-scheme";
import {
  cancelAllNotifications,
  sendTimerNotification,
} from "@/utils/notifications";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function TimerScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  useEffect(() => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    setHours(hrs);
    setMinutes(mins);
    setSeconds(secs);
  }, [totalSeconds]);

  const handleTimerComplete = async () => {
    await sendTimerNotification();
    setCompleted(true);
    Alert.alert("⏰ Time's Up!", "Your timer has finished!");
  };

  const handleStart = () => {
    if (totalSeconds > 0) {
      setIsRunning(!isRunning);
      setCompleted(false);
    }
  };

  const handleReset = async () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setCompleted(false);
    await cancelAllNotifications();
  };

  const handleAddMinute = () => {
    if (!isRunning) {
      setTotalSeconds((prev) => prev + 60);
      setCompleted(false);
    }
  };

  const handleAddSecond = () => {
    if (!isRunning) {
      setTotalSeconds((prev) => prev + 1);
      setCompleted(false);
    }
  };

  const displayHours = String(hours).padStart(2, "0");
  const displayMinutes = String(minutes).padStart(2, "0");
  const displaySeconds = String(seconds).padStart(2, "0");

  const bgColor = isDark ? "#1A1A1A" : "#F5F5F5";
  const textColor = isDark ? "#FFF" : "#000";
  const buttonBg = isDark ? "#333" : "#E0E0E0";

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Timer</Text>

      {/* Timer Display */}
      <View
        style={[
          styles.timerDisplay,
          { backgroundColor: isDark ? "#222" : "#FFF", borderColor: textColor },
        ]}
      >
        <Text style={[styles.timerText, { color: textColor }]}>
          {displayHours}:{displayMinutes}:{displaySeconds}
        </Text>
      </View>

      {/* Input Controls */}
      <View style={styles.inputControls}>
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Minutes</Text>
          <TouchableOpacity
            style={[styles.inputButton, { backgroundColor: buttonBg }]}
            onPress={handleAddMinute}
            disabled={isRunning}
          >
            <Text style={[styles.inputButtonText, { color: textColor }]}>
              + 1 min
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: textColor }]}>Seconds</Text>
          <TouchableOpacity
            style={[styles.inputButton, { backgroundColor: buttonBg }]}
            onPress={handleAddSecond}
            disabled={isRunning}
          >
            <Text style={[styles.inputButtonText, { color: textColor }]}>
              + 1 sec
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Control Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isRunning ? "#FF6B6B" : "#4CAF50",
              opacity: totalSeconds === 0 && !isRunning ? 0.5 : 1,
            },
          ]}
          onPress={handleStart}
          disabled={totalSeconds === 0 && !isRunning}
        >
          <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2196F3" }]}
          onPress={handleReset}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      {/* Status */}
      <Text style={[styles.status, { color: textColor }]}>
        {isRunning
          ? "⏱Running..."
          : completed
            ? "✓ Time's up!"
            : totalSeconds === 0
              ? "Set a timer"
              : "⏸Paused"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
  },
  timerDisplay: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    shadowColor: "transparent",
    elevation: 0,
  },
  timerText: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "Courier New",
  },
  inputControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  inputGroup: {
    alignItems: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  inputButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    minWidth: 120,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },
});
