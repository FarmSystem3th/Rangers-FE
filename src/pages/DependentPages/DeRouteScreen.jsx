import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Button,
} from "react-native";
import { getStaticMap } from "../../libs/apis/api/getStaticMap";

const DeRouteScreen = () => {
  const [mapUrl, setMapUrl] = useState("");
  const [zoom, setZoom] = useState("15"); // 기본 줌 레벨
  const [width, setWidth] = useState("512"); // 기본 너비
  const [height, setHeight] = useState("512"); // 기본 높이

  const fetchMap = async () => {
    try {
      const blob = await getStaticMap(
        126.98452047, // 경도
        37.56656541, // 위도
        parseInt(zoom), // 줌 레벨
        parseInt(width), // 너비
        parseInt(height) // 높이
      );

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result;
        console.log("Base64 이미지 URL:", base64data); // Base64 URL 콘솔 출력
        setMapUrl(base64data); // 상태 업데이트
      };

      reader.readAsDataURL(blob); // Blob을 Base64로 변환
    } catch (error) {
      console.error("지도 로드 실패:", error);
    }
  };

  const increaseZoom = () => {
    setZoom((prev) => {
      const newZoom = (parseInt(prev) + 1).toString();
      fetchMap(); // 줌 레벨 변경 후 지도를 다시 로드
      return newZoom;
    });
  };

  const decreaseZoom = () => {
    setZoom((prev) => {
      const newZoom = (parseInt(prev) - 1).toString();
      fetchMap(); // 줌 레벨 변경 후 지도를 다시 로드
      return newZoom;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Zoom Level:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={zoom}
        onChangeText={setZoom}
      />
      <Text>Width:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={width}
        onChangeText={setWidth}
      />
      <Text>Height:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <Button title="Fetch Map" onPress={fetchMap} />

      <Button title="Zoom In" onPress={increaseZoom} />
      <Button title="Zoom Out" onPress={decreaseZoom} />

      {mapUrl ? (
        <Image
          source={{ uri: mapUrl }} // Base64 URL로 이미지 표시
          style={styles.mapImage}
          resizeMode="cover"
        />
      ) : (
        <Text>지도 로딩 중...</Text>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    padding: 5,
    textAlign: "center",
  },
  mapImage: {
    width: 512,
    height: 512,
    marginTop: 20,
  },
});

export default DeRouteScreen;
