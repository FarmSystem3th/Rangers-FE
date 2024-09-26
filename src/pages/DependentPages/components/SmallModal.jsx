import React, { useEffect, useState } from "react";
import { Modal, View, StyleSheet } from "react-native";
import DependentsText from "../../../style/DependentsText";
import useTTS from "../hooks/useTTS";

const SmallModal = ({ visible, onClose, modalText }) => {
  const { startTTS, stopTTS } = useTTS();
  const [hasSpoken, setHasSpoken] = useState(false); // TTS 실행 여부 상태

  useEffect(() => {
    let timer; // 5초 대기 타이머를 저장할 변수

    if (visible && !hasSpoken) {
      startTTS(modalText, () => {
        // TTS가 완료되면 호출되는 콜백
        stopTTS(); // TTS 중지

        // TTS 완료 후 5초 동안 기다린 후 모달 닫기
        timer = setTimeout(() => {
          onClose(); // 모달 닫기
          setHasSpoken(false); // 상태 초기화
        }, 5000); // 5초 후 모달 닫기
      });
      setHasSpoken(true); // TTS 실행 상태 업데이트
    }

    return () => {
      if (timer) {
        clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
      }
      if (hasSpoken) {
        stopTTS(); // 컴포넌트 언마운트 시 TTS 중지
        setHasSpoken(false); // 상태 초기화
      }
    };
  }, [visible, modalText, startTTS, stopTTS, hasSpoken, onClose]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide" // 모달이 아래에서 위로 올라오도록 설정
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <DependentsText
            fontSize={40}
            lineHeight={50}
            style={styles.modalText}
          >
            {modalText}
          </DependentsText>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // 화면 아래에 위치
    marginBottom: 50, // 아래에 약간의 여백 추가
    marginLeft: 30, // 왼쪽 여백 추가
    marginRight: 30, // 오른쪽 여백 추가
  },
  modalContent: {
    width: "100%",
    padding: 20,
    backgroundColor: "white", // 모달의 배경은 흰색
    borderRadius: 20,
    borderColor: "#213B6D",
    borderWidth: 5,
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalText: {
    textAlign: "center",
  },
});

export default SmallModal;
