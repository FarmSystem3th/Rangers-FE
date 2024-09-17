import { useEffect, useRef } from "react";
import * as Speech from "expo-speech";

const useTTS = (text, onDoneCallback) => {
  // TTS가 이미 실행되었는지 확인하기 위한 ref 변수
  const hasSpoken = useRef(false);

  useEffect(() => {
    // 텍스트가 없거나 이미 말한 경우 함수를 종료
    if (!text || hasSpoken.current) return;

    // TTS를 시작하고 완료되면 콜백을 호출
    Speech.speak(text, {
      onDone: () => {
        hasSpoken.current = true; // 한 번만 실행되도록 설정
        Speech.stop(); // 말하기를 중지
        if (onDoneCallback) {
          onDoneCallback(); // TTS가 완료되면 콜백 함수를 호출
        }
      },
      onError: (error) => {
        console.error("TTS 오류:", error);
        hasSpoken.current = true; // 오류 발생 시에도 중지
        Speech.stop();
      },
    });

    // 컴포넌트가 언마운트될 때 TTS를 중지
    return () => {
      Speech.stop();
    };
  }, [text, onDoneCallback]);
};

export default useTTS;
