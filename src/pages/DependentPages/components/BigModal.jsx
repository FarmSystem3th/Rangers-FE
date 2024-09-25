import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import YellowButton from "../components/YellowButton";
import BlueButton from "../components/BlueButton";
import DependentsText from "../../../style/DependentsText";
import useTTS from "../hooks/useTTS";
import WaveComponent from "./WaveComponent";
import useAudioRecording from "../hooks/useSTTrecording";

const BigModal = ({ visible, onClose, modalText }) => {
  const { isRecording, startRecording, stopRecording } = useAudioRecording();
  const { startTTS, stopTTS } = useTTS();
  const [hasSpoken, setHasSpoken] = useState(false); // TTS 실행 여부 상태

  useEffect(() => {
    if (visible && !hasSpoken) {
      startTTS(modalText, startRecording); // 모달이 열릴 때 TTS 및 녹음 시작
      setHasSpoken(true); // TTS 실행 상태 업데이트
    }

    // 모달이 닫힐 때만 TTS 및 녹음 중지
    if (!visible && hasSpoken) {
      stopTTS();
      stopRecording();
      setHasSpoken(false); // TTS 실행 상태 초기화
    }
  }, [
    visible,
    modalText,
    startTTS,
    stopTTS,
    startRecording,
    stopRecording,
    hasSpoken,
  ]);

  return (
    <Modal transparent={true} visible={visible} animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <DependentsText
            fontSize={40}
            lineHeight={50}
            style={styles.modalText}
          >
            {modalText}
          </DependentsText>
          <View style={styles.buttonContainer}>
            <YellowButton
              width={250}
              height={70}
              fontSize={42}
              text="예"
              onPress={() => onClose("yes")}
            />
            <BlueButton
              width={250}
              height={70}
              fontSize={42}
              text="아니오"
              onPress={() => onClose("no")}
            />
          </View>
          {isRecording && <WaveComponent />}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    height: "80%",
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#213B6D",
    borderWidth: 5,
    alignItems: "center",
    overflow: "hidden",
  },
  modalText: {
    textAlign: "center",
    marginBottom: 70,
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
});

export default BigModal;
