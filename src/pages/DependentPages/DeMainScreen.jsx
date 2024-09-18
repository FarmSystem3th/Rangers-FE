import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { useLoadFonts } from "../../style/loadFonts";
import YellowButton from "./components/YellowButton";
import BlueButton from "./components/BlueButton";
import DependentsText from "../../style/DependentsText";
import WaveComponent from "./components/WaveComponent";
import useAudioRecording from "./hooks/useSTTrecording";
import useTTS from "./hooks/useTTS";

const DeMainScreen = ({ navigation }) => {
  const { isRecording, startRecording, stopRecording } = useAudioRecording();
  const { stopTTS } = useTTS(); // TTS 중지 함수 가져오기
  const fontsLoaded = useLoadFonts();

  const greetingText =
    "000님! 안녕하세요, Rangers map 입니다. 길찾기와 내 주변 보기 중 어떤 것이 필요하신가요? 말씀해주세요."; // TTS에 사용할 멘트

  useTTS(greetingText, startRecording);

  if (!fontsLoaded) {
    return null; // 폰트가 로드될 때까지는 아무것도 렌더링하지 않음
  }

  const handleFindRoute = () => {
    if (isRecording) {
      stopRecording(); // 녹음 중이라면 중지
    }
    stopTTS(); // TTS 중지
    navigation.navigate("PreDeRouteScreen"); // DeRouteScreen으로 이동
  };

  const handleNearby = () => {
    if (isRecording) {
      stopRecording(); // 녹음 중이라면 중지
    }
    stopTTS(); // TTS 중지
    navigation.navigate("DeNearByScreen"); // DeRouteScreen으로 이동
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
