import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../src/Components/AuthContext";
import { useTheme } from "../src/Components/ThemeContext";
import { useUserStore } from "../src/Components/useCounter";

export default function ProfileTab() {
  const { username, totalLikes, incrementLikes, decrementLikes } =
    useUserStore();
  const auth = useAuth();
  const { colors, toggleTheme, theme } = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
            <TouchableOpacity
              style={[styles.themeBtn, { backgroundColor: colors.border }]}
              onPress={toggleTheme}
            >
              <MaterialCommunityIcons
                name={
                  theme === "dark"
                    ? "white-balance-sunny"
                    : "moon-waning-crescent"
                }
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.section, { borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Username
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {username}
            </Text>
          </View>

          <View style={[styles.section, { borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Authentication Status
            </Text>
            <Text
              style={[
                styles.status,
                { color: auth.isLogin ? colors.success : colors.error },
              ]}
            >
              {auth.isLogin ? "Logged In" : "Not Logged In"}
            </Text>
          </View>

          {auth.isLogin && (
            <View
              style={[styles.section, { borderBottomColor: colors.border }]}
            >
              <Text style={[styles.label, { color: colors.textSecondary }]}>
                Account
              </Text>
              <Text style={[styles.value, { color: colors.text }]}>
                ID: {auth.user?.id}
              </Text>
              <Text style={[styles.value, { color: colors.text }]}>
                Name: {auth.user?.name}
              </Text>
            </View>
          )}

          <View style={[styles.section, { borderBottomColor: colors.border }]}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Total Likes
            </Text>
            <Text style={[styles.likesCount, { color: colors.primary }]}>
              {totalLikes}
            </Text>

            <View style={styles.likesRow}>
              <TouchableOpacity
                style={[styles.likeBtnMinus, { backgroundColor: colors.error }]}
                onPress={decrementLikes}
              >
                <Text style={styles.likeBtnText}>−</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.likeBtnPlus,
                  { backgroundColor: colors.success },
                ]}
                onPress={incrementLikes}
              >
                <Text style={styles.likeBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  themeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    width: "100%",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: "600",
  },
  likesCount: {
    fontSize: 48,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 16,
  },
  likesRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginTop: 12,
  },
  likeBtnPlus: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBtnMinus: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  likeBtnText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#FFF",
  },
});
