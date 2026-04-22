import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

interface SuccessAnimationProps {
  onComplete?: () => void;
}

const SuccessAnimation: React.FC<SuccessAnimationProps> = ({ onComplete }) => {
  const animRef = useRef<LottieView>(null);

  useEffect(() => {
    animRef.current?.play(0, 120);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        ref={animRef}
        source={require('../../assets/animations/success-checkmark.json')}
        autoPlay={false}
        loop={false}
        style={styles.animation}
        onAnimationFinish={onComplete}
      />
      <Text style={styles.message}>Payment Successful!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 30 },
  animation: { width: 150, height: 150 },
  message: { fontSize: 20, fontWeight: '700', color: '#2ECC71', marginTop: 10 },
});

export default SuccessAnimation;