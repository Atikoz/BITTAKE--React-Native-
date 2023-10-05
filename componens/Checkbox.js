import React, { useEffect, useRef } from 'react';
import { Pressable, StyleSheet, Animated } from 'react-native';

const Checkbox = ({
  checked,
  onChange,
  activeButtonStyle = {},
  inactiveButtonStyle = {},
}) => {
  const sliderX = useRef(new Animated.Value(checked ? 26 : 0)).current;

  useEffect(() => {
    Animated.timing(sliderX, {
      toValue: checked ? 22 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [checked]);

  return (
    <Pressable
      style={[
        styles.switch,
        checked ? activeButtonStyle : inactiveButtonStyle,
      ]}
      onPress={() => onChange(!checked)}
    >
      <Animated.View
        style={[
          styles.slider,
          {
            transform: [{ translateX: sliderX }],
          },
        ]}
      ></Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 48,
    height: 26,
    borderRadius: 18,
    backgroundColor: '#3d3d3d',
    padding: 3,
  },
  slider: {
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 18,
  },
});

export default Checkbox;