import React, { useState, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, TextInput } from "react-native";
import { useLoadFonts } from "../../style/loadFonts";
import DependentsText from "../../style/DependentsText";
import WaveComponent from "./components/WaveComponent";
import useAudioRecording from "./hooks/useSTTrecording";
import useTTS from "./hooks/useTTS";
import BlueButton from "./components/BlueButton";
import BigModal from "./components/BigModal"; // BigModal import

const PreDeRouteScreen = ({ navigation }) => {
  const { isRecording, startRecording, stopRecording } = useAudioRecording();
  const { startTTS, stopTTS } = useTTS();
  const fontsLoaded = useLoadFonts();
  const [destination, setDestination] = useState("");
  const [isPlaceholderVisible, setPlaceholderVisible] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false); // TTS 중복 방지
  const greetingText = "목적지를 말씀해 주세요."; // TTS에 사용할 멘트

  // TTS가 처음 한 번만 실행되도록 설정
  useEffect(() => {
    {
      startTTS(greetingText, startRecording); // TTS 완료 후 녹음 시작
    }

    return () => {
      stopTTS(); // 컴포넌트 언마운트 시 TTS 중지
      stopRecording(); // 컴포넌트 언마운트 시 녹음 중지
    };
  }, []);

  if (!fontsLoaded) {
    return null; // 폰트가 로드될 때까지 아무것도 렌더링하지 않음
  }

  const handleFindRoute = () => {
    stopTTS(); // TTS 중지
    stopRecording(); // 녹음 중지
    setModalVisible(true); // 모달 열기
  };

  const handleModalClose = (answer) => {
    setModalVisible(false); // 모달 닫기
    if (answer === "yes") {
      navigation.navigate("DeRouteScreen", { destination }); // DeRouteScreen으로 이동 및 목적지 전달
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <View style={styles.greetingContainer}>
            <DependentsText fontSize={50} lineHeight={70} color="#FF1F00">
              목적지
            </DependentsText>
            <DependentsText fontSize={45} lineHeight={65}>
              를 말씀해 주세요.
            </DependentsText>
          </View>
          <View style={styles.inputContainer}>
            {isPlaceholderVisible && (
              <DependentsText
                fontSize={30}
                lineHeight={80}
                style={styles.placeholder}
              >
                목적지 입력하기
              </DependentsText>
            )}
            <TextInput
              style={styles.input}
              value={destination}
              onChangeText={setDestination}
              onFocus={() => setPlaceholderVisible(false)} // 인풋 클릭 시 플레이스홀더 숨기기
              onBlur={() => {
                if (destination === "") {
                  setPlaceholderVisible(true); // 입력이 없으면 플레이스홀더 다시 표시
                }
              }}
            />
          </View>
          <BlueButton
            width={285}
            height={60}
            fontSize={32}
            text="입력 완료"
            onPress={handleFindRoute}
          />
        </View>
      </View>
      {isRecording && <WaveComponent />}
      <BigModal
        visible={isModalVisible}
        onClose={handleModalClose}
        modalText={`${destination}로 안내해 드릴까요?`}
      />
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
    height: "auto",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    position: "relative",
  },
  input: {
    width: "100%",
    borderColor: "#00000",
    borderWidth: 5,
    borderRadius: 10,
    padding: 25,
    marginTop: 5,
  },
  placeholder: {
    position: "absolute",
    top: 10,
    left: 15,
    color: "gray",
  },
});

export default PreDeRouteScreen;
