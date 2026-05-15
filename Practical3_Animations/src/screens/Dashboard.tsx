import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../Components/AuthContext";
import { useTheme } from "../Components/ThemeContext";

export default function Dashboard() {
  const auth = useAuth();
  const { colors } = useTheme();

  const handleLogin = () => {
    const myUser = {
      id: "777",
      name: "Yeshey Lhaden",
    };
    auth.login(myUser);
  };

  const handleLogout = () => {
    auth.logout();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Dashboard</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Authentication
      </Text>
      {auth.isLogin ? (
        <>
          <Text style={[styles.userText, { color: colors.text }]}>
            Welcome, {auth.user?.name}!
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleLogout}
          >
            <Text style={[styles.text, { color: colors.background }]}>
              Logout
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleLogin}
        >
          <Text style={[styles.text, { color: colors.background }]}>Login</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderRadius: 5,
    textAlign: "center",
  },
  userText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
