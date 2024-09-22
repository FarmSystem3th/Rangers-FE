import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useLoadFonts } from "../../../style/loadFonts";
import DependentsText from "../../../style/DependentsText";

const PinkButton = ({ width, height, fontSize, text, onPress }) => {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.button, { width, height }]}
      onPress={onPress}
    >
      <View style={styles.buttonBackgroundPink} />
      <DependentsText
        color="#213B6D"
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
  buttonBackgroundPink: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#F6D2D2",
    borderRadius: 20,
    borderColor: "#213B6D",
    borderWidth: 5,
  },
  buttonTextYellow: {
    textAlign: "center",
  },
});

export default PinkButton;
