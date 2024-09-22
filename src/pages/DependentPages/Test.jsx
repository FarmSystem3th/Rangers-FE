import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Audio } from "expo-av"; // 권장되는 expo-av 사용
import Voice from "react-native-voice";

const Test = () => {
  const [isRecord, setIsRecord] = useState(false);
  const [text, setText] = useState("");
  const [showRecordButton, setShowRecordButton] = useState(false);

  const buttonLabel = isRecord ? "Stop" : "Start";
  const voiceLabel = text
    ? text
    : isRecord
    ? "Say something..."
    : "Press Start button";

  // 마이크 권한 요청 함수
  const requestMicrophonePermission = async () => {
    const { status } = await Audio.requestPermissionsAsync(); // 권한 요청
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Microphone permission is required to use this feature."
      );
      setShowRecordButton(false);
    } else {
      setShowRecordButton(true);
    }
  };

  const _onSpeechStart = () => {
    console.log("onSpeechStart");
    setText("");
  };

  const _onSpeechEnd = () => {
    console.log("onSpeechEnd");
  };

  const _onSpeechResults = (event) => {
    console.log("onSpeechResults");
    setText(event.value[0]);
  };

  const _onSpeechError = (event) => {
    console.log("_onSpeechError");
    console.log(event.error);
  };

  const _onRecordVoice = async () => {
    if (isRecord) {
      try {
        await Voice.stop();
      } catch (error) {
        console.error("Error stopping voice recognition:", error);
      }
    } else {
      try {
        await Voice.start("en-US");
      } catch (error) {
        console.error("Error starting voice recognition:", error);
      }
    }
    setIsRecord(!isRecord);
  };

  useEffect(() => {
    requestMicrophonePermission(); // 컴포넌트가 마운트되었을 때 마이크 권한 요청

    // 음성 인식 이벤트 핸들러 설정
    Voice.onSpeechStart = _onSpeechStart;
    Voice.onSpeechEnd = _onSpeechEnd;
    Voice.onSpeechResults = _onSpeechResults;
    Voice.onSpeechError = _onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.voiceText}>{voiceLabel}</Text>
      {showRecordButton && (
        <Button onPress={_onRecordVoice} title={buttonLabel} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  },
  voiceText: {
    margin: 32,
  },
});

export default Test;
