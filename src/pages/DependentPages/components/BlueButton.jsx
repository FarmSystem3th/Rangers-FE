import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useLoadFonts } from "../../../style/loadFonts";
import DependentsText from "../../../style/DependentsText";

const BlueButton = ({ width, height, fontSize, text, onPress }) => {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.button, { width, height }]}
      onPress={onPress}
    >
      <View style={styles.buttonBackgroundBlue} />
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
