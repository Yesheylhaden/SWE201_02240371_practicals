import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const GoldScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Gold Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gold',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default GoldScreen;