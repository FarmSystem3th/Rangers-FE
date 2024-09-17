import React from 'react';
import { Text } from 'react-native';
import { useLoadFonts } from './loadFonts'; 

const DependentsText = ({ color, fontSize, width, lineHeight, style, children, ...props }) => {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null; // 폰트가 로드될 때까지 렌더링하지 않음
  }

  return (
    <Text
      {...props}
      style={{
        ...style,
        fontFamily: 'Gmarket-Sans-Bold', // 폰트 적용
        color: color, // 프롭스로 받은 색상 적용
        fontSize: fontSize, // 프롭스로 받은 폰트 크기 적용
        width: width, // 프롭스로 받은 넓이 적용
        lineHeight: lineHeight, // 프롭스로 받은 줄 간격 적용
        // 주의: fontWeight 사용 시 폰트 적용이 안 될 수 있음
      }}
    >
      {children}
    </Text>
  );
};

export default DependentsText;
