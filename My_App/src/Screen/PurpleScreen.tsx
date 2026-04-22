import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PurpleScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Purple Screen</Text>
    </View>
  );
};

export default PurpleScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c800ff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#ffffff",
  },
});