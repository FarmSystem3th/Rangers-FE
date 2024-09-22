import { useState, useEffect } from "react";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset"; 

// 커스텀 훅: 이미지 파일을 Base64로 변환
const useImageToBase64 = (imagePath) => {
  const [imageBase64, setImageBase64] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const asset = Asset.fromModule(imagePath);
        await asset.downloadAsync(); // 이미지 다운로드
        const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setImageBase64(`data:image/png;base64,${base64}`);
      } catch (e) {
        setError(e);
        console.error("Image loading error:", e);
      }
    };

    loadImage();
  }, [imagePath]);

  return { imageBase64, error };
};

export default useImageToBase64;
