import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useLoadFonts } from "../../style/loadFonts";
import YellowButton from "./components/YellowButton";
import BlueButton from "./components/BlueButton";
import DependentsText from "../../style/DependentsText"; // DependentsText 컴포넌트 임포트
import WaveComponent from "./components/WaveComponent";

const DeMainScreen = () => {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null; // 폰트가 로드될 때까지는 아무것도 렌더링하지 않음
  }

  const handleFindRoute = () => {
    console.log("길찾기 버튼이 눌렸습니다.");
  };

  const handleNearby = () => {
    console.log("내 주변 보기 버튼이 눌렸습니다.");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.greetingContainer}>
            <DependentsText fontSize={30} lineHeight={42}>
              000님, 안녕하세요 ☺️{"\n"}무엇을 도와 드릴까요?
            </DependentsText>
          </View>
          <View style={styles.buttonContainer}>
            <YellowButton
              width={285}
              height={70}
              fontSize={42}
              text="길찾기"
              onPress={handleFindRoute}
            />

            <BlueButton
              width={285}
              height={70}
              fontSize={42}
              text="내 주변 보기"
              onPress={handleNearby}
            />
          </View>
        </View>
      </View>
      <WaveComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  mainContainer: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    gap: 44,
  },

  greetingContainer: {
    width: "100%",
    alignItems: "center",
  },
  greetingText: {
    color: "black",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    margin: 22,
    gap: 48,
  },
  stripContainer: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  strips: {
    flexDirection: "row",
  },
  strip: {
    width: 43,
    height: 0,
    borderWidth: 6,
    borderColor: "#213B6D",
    transform: [{ rotate: "90deg" }],
    marginHorizontal: 2,
  },
});

export default DeMainScreen;
