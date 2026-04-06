import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const TomatoScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tomato Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'tomato',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default TomatoScreen;