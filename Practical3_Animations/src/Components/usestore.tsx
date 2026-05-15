import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCounterStore } from "./CounterStore";
import { useTheme } from "./ThemeContext";

const CounterScreen: React.FC = () => {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);
  const reset = useCounterStore((state) => state.reset);
  const { colors } = useTheme();

  const countColor =
    count > 0 ? colors.success : count < 0 ? colors.error : colors.text;

  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.textSecondary }]}>
        Counter
      </Text>

      <View
        style={[
          styles.countWrapper,
          { backgroundColor: colors.border, borderColor: colors.border },
        ]}
      >
        <Text style={[styles.count, { color: countColor }]}>{count}</Text>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={[
            styles.btn,
            styles.btnSecondary,
            { backgroundColor: colors.border, borderColor: colors.border },
          ]}
          onPress={decrement}
        >
          <Text style={styles.btnTextLarge}>−</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            styles.btnPrimary,
            { backgroundColor: colors.success },
          ]}
          onPress={increment}
        >
          <Text style={styles.btnTextLarge}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.btn,
          styles.btnReset,
          { backgroundColor: colors.border, borderColor: colors.border },
        ]}
        onPress={reset}
      >
        <Text style={[styles.btnTextReset, { color: colors.textSecondary }]}>
          Reset
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: 320,
    borderRadius: 24,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
    marginBottom: 24,
  },
  countWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 36,
    borderWidth: 2,
  },
  count: {
    fontSize: 64,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  btn: {
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: {
    width: 72,
    height: 72,
  },
  btnSecondary: {
    width: 72,
    height: 72,
    borderWidth: 1,
  },
  btnReset: {
    width: 160,
    height: 44,
    borderWidth: 1,
  },
  btnTextLarge: {
    fontSize: 32,
    fontWeight: "400",
    color: "#FFFFFF",
    lineHeight: 38,
  },
  btnTextReset: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

export default CounterScreen;
