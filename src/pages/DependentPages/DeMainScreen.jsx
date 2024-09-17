import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useLoadFonts } from "../../style/loadFonts";
import YellowButton from "./components/YellowButton";
import BlueButton from "./components/BlueButton";
import DependentsText from "../../style/DependentsText";
import WaveComponent from "./components/WaveComponent";
import useAudioRecording from "./hooks/useSTTrecording";
import useTTS from "./hooks/useTTS";
const DeMainScreen = () => {
  const { isRecording, startRecording } = useAudioRecording();
  const fontsLoaded = useLoadFonts();

  const greetingText =
    "000님! 안녕하세요, Rangers map 입니다. 길찾기와 내 주변 보기 중 어떤 것이 필요하신가요? 말씀해주세요."; // TTS에 사용할 멘트

  useTTS(greetingText, startRecording); // TTS가 끝나면 녹음 시작

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
      {isRecording && <WaveComponent />}
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
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    margin: 22,
    gap: 48,
  },
});

export default DeMainScreen;
