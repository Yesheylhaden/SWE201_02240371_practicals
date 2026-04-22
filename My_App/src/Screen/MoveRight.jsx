import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Animated from 'react-native-reanimated';

const MyComponent = () => {
  const offset = useSharedValue(0);

  // This runs on the UI thread — no bridge needed
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  const moveRight = () => {
    // withTiming smoothly animates to the new value
    offset.value = withTiming(200, { duration: 500 });
  };

  return (
    <Animated.View style={[styles.box, animatedStyle]}>
      <TouchableOpacity onPress={moveRight}>
        <Text>Move Right</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#FFA02E',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 50,
    alignSelf: 'center',
  },
});

export default MyComponent;