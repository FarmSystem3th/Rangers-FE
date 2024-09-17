import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import DependentsText from "../../../style/DependentsText"; // DependentsText 컴포넌트 임포트

const YellowButton = ({ width, height, fontSize, text, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.button, { width, height }]}
      onPress={onPress}
    >
      <View style={styles.buttonBackgroundYellow} />
      <DependentsText
        color="#213B6D"
        fontSize={fontSize}
        style={styles.buttonText}
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
  buttonBackgroundYellow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFEE00",
    borderRadius: 20,
    borderColor: "#213B6D",
    borderWidth: 5,
  },
  buttonText: {
    textAlign: "center",
  },
});

export default YellowButton;
