import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useLoadFonts } from "../../../style/loadFonts"; // 폰트 로딩 훅 임포트
import DependentsText from "../../../style/DependentsText";
const BlueButton = ({ width, height, fontSize, text, onPress }) => {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null; // 폰트가 로드될 때까지는 아무것도 렌더링하지 않음
  }

  return (
    <TouchableOpacity
      style={[styles.button, { width, height }]}
      onPress={onPress}
    >
      <View style={styles.buttonBackgroundBlue} />
      {/* AppText로 텍스트 렌더링 */}
      <DependentsText
        color="#FFEC00"
        fontSize={fontSize}
        style={styles.buttonTextYellow}
      >
        {text}
      </DependentsText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonBackgroundBlue: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#213B6D",
    borderRadius: 20,
    borderColor: "#213B6D",
    borderWidth: 3,
  },
  buttonTextYellow: {
    textAlign: "center",
  },
});

export default BlueButton;
