import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, Dimensions, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const WaveComponent = () => {
  // 애니메이션 값 초기화
  const scaleOne = useRef(new Animated.Value(1)).current;
  const scaleTwo = useRef(new Animated.Value(1)).current;
  const scaleThree = useRef(new Animated.Value(1)).current;

  const colorOne = useRef(new Animated.Value(0)).current;
  const colorTwo = useRef(new Animated.Value(0)).current;
  const colorThree = useRef(new Animated.Value(0)).current;

  // 애니메이션 시작 함수
  const startWaveAnimation = (animatedValue, colorValue, duration) => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.5,
          duration: duration,
          useNativeDriver: false, // 네이티브 드라이버 사용 해제
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: duration,
          useNativeDriver: false, // 네이티브 드라이버 사용 해제
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(colorValue, {
          toValue: 1,
          duration: duration,
          useNativeDriver: false, // 네이티브 드라이버 사용 해제
        }),
        Animated.timing(colorValue, {
          toValue: 0,
          duration: duration,
          useNativeDriver: false, // 네이티브 드라이버 사용 해제
        }),
      ])
    ).start();
  };

  useEffect(() => {
    startWaveAnimation(scaleOne, colorOne, 1000); // 1초마다 애니메이션 반복
    startWaveAnimation(scaleTwo, colorTwo, 1200); // 1.2초마다 애니메이션 반복
    startWaveAnimation(scaleThree, colorThree, 1400); // 1.4초마다 애니메이션 반복
  }, []);

  // 색상 애니메이션 설정
  const bgColorOne = colorOne.interpolate({
    inputRange: [0, 1],
    outputRange: ['#689676', '#FFEE00'], // 색상 변화
  });

  const bgColorTwo = colorTwo.interpolate({
    inputRange: [0, 1],
    outputRange: ['#213B6D', '#689676'],
  });

  const bgColorThree = colorThree.interpolate({
    inputRange: [0, 1],
    outputRange: ['#213B6D', '#689676'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.wave,
          {
            transform: [{ scale: scaleOne }],
            backgroundColor: bgColorOne,
            left: '150%',
          },
        ]}
      />
      <Animated.View
        style={[
          styles.wave,
          {
            transform: [{ scale: scaleTwo }],
            backgroundColor: bgColorTwo,
            left: '100%',
          },
        ]}
      />
      <Animated.View
        style={[
          styles.wave,
          {
            transform: [{ scale: scaleThree }],
            backgroundColor: bgColorThree,
                        left: '50%',

          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0, // 하단에 위치
    left: 0,
    width: '100%',
    height: '30%', // 물결 높이 조정
  },
  wave: {
    position: 'absolute',
    bottom: -370, // 하단에 고정
    width: width , // 화면 너비의 두 배
    height: width, // 화면 높이 조정
    marginLeft: -width, // 가운데 정렬
    borderRadius: width, // 둥근 모양
    opacity: 0.5,
  },
});

export default WaveComponent;
