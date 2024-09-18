import { useState } from "react";
import { Audio } from "expo-av";

// 전역 녹음 인스턴스
let recordingInstance = new Audio.Recording();

const useAudioRecording = () => {
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      // 기존 녹음이 있으면 중지
      if (isRecording) {
        await stopRecording();
      }

      console.log("녹음 시작 중...");
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      await recordingInstance.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recordingInstance.startAsync();
      setIsRecording(true);
      console.log("녹음이 시작되었습니다.");

      // 9초 후 자동으로 녹음 중지
      setTimeout(() => {
        stopRecording();
      }, 9000);
    } catch (error) {
      console.error("녹음 시작 실패", error);
      setIsRecording(false); // 에러 발생 시 녹음 상태를 false로 설정
    }
  };

  const stopRecording = async () => {
    try {
      console.log("녹음 중지 중...");
      await recordingInstance.stopAndUnloadAsync();
      const uri = recordingInstance.getURI();
      console.log("녹음이 중지되었으며 저장 위치:", uri);
    } catch (error) {
      console.error("녹음 중지 실패", error);
    } finally {
      setIsRecording(false);
      await Audio.setAudioModeAsync({ allowsRecordingIOS: false });
      recordingInstance = new Audio.Recording(); // 녹음 인스턴스 재설정
    }
  };

  return { isRecording, startRecording, stopRecording };
};

export default useAudioRecording;
