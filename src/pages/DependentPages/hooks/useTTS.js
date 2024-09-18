import { useEffect, useRef } from "react";
import * as Speech from "expo-speech";

const useTTS = (text, onDoneCallback) => {
  const hasSpoken = useRef(false);

  const stopTTS = () => {
    Speech.stop(); // TTS 중지 함수
  };

  useEffect(() => {
    if (!text || hasSpoken.current) return;

    const speak = () => {
      Speech.speak(text, {
        onDone: () => {
          hasSpoken.current = true;
          if (onDoneCallback) {
            onDoneCallback();
          }
        },
        onError: (error) => {
          console.error("TTS 오류:", error);
          hasSpoken.current = true; // 오류 발생 시에도 중지
        },
      });
    };

    speak();

    return () => {
      stopTTS(); // 컴포넌트 언마운트 시 TTS 중지
    };
  }, [text, onDoneCallback]);

  return { stopTTS }; // stopTTS를 반환
};

export default useTTS;
