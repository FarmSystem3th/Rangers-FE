import { useEffect } from "react";
import * as Speech from "expo-speech";

const useTTS = () => {
const startTTS = (text, onDoneCallback) => {
    if (!text) return;

    Speech.speak(text, {
      onDone: onDoneCallback, // TTS가 완료되면 콜백 실행
      onError: (error) => {
        console.error("TTS 오류:", error);
      },
    });
  };

  const stopTTS = () => {
    Speech.stop(); // TTS 중지 함수
  };

  useEffect(() => {
    return () => {
      stopTTS(); // 컴포넌트 언마운트 시 TTS 중지
    };
  }, []);

  return { startTTS, stopTTS };
};

export default useTTS;
