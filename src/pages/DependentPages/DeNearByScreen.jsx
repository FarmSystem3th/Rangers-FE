import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  View,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import * as Location from "expo-location";
import useImageToBase64 from "./hooks/useImageToBase64";
import BigModal from "./components/BigModal";
import PinkButton from "./components/PinkButton";
import { getSafeZones } from "../../libs/apis/api/getSafeZones";
import { getDangerZones } from "../../libs/apis/api/getDangerZones";
import { sendSOSAlert } from "../../libs/apis/api/sendSOSAlert";

const DeNearbyScreen = ({ navigation }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isEmergencyModalVisible, setIsEmergencyModalVisible] = useState(false);
  const [isEndModalVisible, setIsEndModalVisible] = useState(false);
  const [isMarkerClicked, setIsMarkerClicked] = useState(false);
  const [safeZoneData, setSafeZoneData] = useState([]); // 안전 구역 데이터를 위한 state
  const [dangerZoneData, setDangerZoneData] = useState([]); // 위험 구역 데이터를 위한 state

  const appKey = "EDhNkmXDhZ6Vec82hJfcS4JbTCOk5GET8y2cFrGQ";

  // 현재 위치 마커 이미지 로드
  const { imageBase64: nowMarkerBase64, error: startMarkerError } =
    useImageToBase64(require("../DependentPages/assets/now.png"));

  // 위험 구역 마커 이미지 로드
  const { imageBase64: dangerMarkerBase64, error: dangerMarkerError } =
    useImageToBase64(require("../DependentPages/assets/Danger.png"));

  // 안전 구역 마커 이미지 로드
  const { imageBase64: safeMarkerBase64, error: safeMarkerError } =
    useImageToBase64(require("../DependentPages/assets/Safe.png"));

  // 현재 위치 추적 및 구역 데이터 가져오기
  useEffect(() => {
    const startWatchingPosition = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    };

    startWatchingPosition();

    // 안전 구역 및 위험 구역 데이터 가져오기
    getSafeZones().then((safeZones) => {
      if (safeZones) {
        setSafeZoneData(safeZones);
      }
    });

    getDangerZones().then((dangerZones) => {
      if (dangerZones) {
        setDangerZoneData(dangerZones);
      }
    });
  }, []);

  // 이미지 로드 에러 처리
  if (startMarkerError || dangerMarkerError || safeMarkerError) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Error loading image</Text>
      </SafeAreaView>
    );
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Nearby Map</title>
    <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${appKey}"></script>
    <script type="text/javascript">
      var map;
      function initTmap(){
        map = new Tmapv2.Map("map_div", {
          center: new Tmapv2.LatLng(${latitude}, ${longitude}),
          width: "100%",
          height: "100%",
          zoom: 19
        });

        // 현재 위치 마커 생성
        var marker = new Tmapv2.Marker({
          position: new Tmapv2.LatLng(${latitude}, ${longitude}),
          icon: "${nowMarkerBase64}",
          iconSize: new Tmapv2.Size(250, 240),
          map: map
        });

        // 위험 구역 마커 생성
        addDangerMarkers(${JSON.stringify(dangerZoneData)});

        // 안전 구역 마커 생성
        addSafeMarkers(${JSON.stringify(safeZoneData)});
      }

      // 위험 구역 데이터 추가 및 마커 생성
      function addDangerMarkers(dangerData) {
        dangerData.forEach((data) => {
          var marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(data.latitude, data.longitude),
            icon: "${dangerMarkerBase64}",
            iconSize: new Tmapv2.Size(150, 150),
            map: map
          });

          // 마커 클릭 시 메시지 전송
          marker.addListener("click", function(evt) {
            window.ReactNativeWebView.postMessage("danger_marker_clicked");
          });
        });
      }

      // 안전 구역 데이터 추가 및 마커 생성 (API로 받은 데이터 사용)
      function addSafeMarkers(safeData) {
        safeData.forEach((data) => {
          var marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(data.latitude, data.longitude),
            icon: "${safeMarkerBase64}",
            iconSize: new Tmapv2.Size(150, 150),
            map: map
          });

          // 마커 클릭 시 메시지 전송
          marker.addListener("click", function(evt) {
            window.ReactNativeWebView.postMessage("safe_marker_clicked");
          });
        });
      }
    </script>
    <style>
      body, html { margin: 0; padding: 0; height: 100%; }
      #map_div { width: 100%; height: 100%; }
    </style>
    </head>
    <body onload="initTmap()">
      <div id="map_div"></div>
    </body>
    </html>
  `;

  // 긴급 버튼 클릭 시 모달 열기
  const onEmergencyPress = () => {
    setIsEmergencyModalVisible(true);
  };

  // 안내 종료 버튼 클릭 시 모달 열기
  const onEndPress = () => {
    setIsEndModalVisible(true);
  };

  // 안내 종료 모달 처리
  const handleEndModalClose = (answer) => {
    if (answer === "yes") {
      navigation.navigate("DeMain"); // DeMainScreen으로 이동
    }
    setIsEndModalVisible(false); // 모달 닫기
  };

  // WebView 메시지 처리
  const handleMessage = (event) => {
    const message = event.nativeEvent.data;

    if (
      message === "danger_marker_clicked" ||
      message === "safe_marker_clicked"
    ) {
      setIsMarkerClicked(true); // 마커 클릭 시 모달 표시
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {latitude && longitude ? (
        <>
          <WebView
            originWhitelist={["*"]}
            source={{ html: htmlContent }}
            style={styles.webView}
            onMessage={handleMessage}
          />

          {/* 긴급 버튼 */}
          <TouchableOpacity
            style={styles.emergencyButton}
            onPress={onEmergencyPress}
          >
            <Image
              source={require("./assets/emergency.png")}
              style={styles.emergencyImage}
            />
          </TouchableOpacity>

          {/* 긴급 모달 */}
          <BigModal
            visible={isEmergencyModalVisible}
            modalText={"긴급상황이 맞으신가요?"}
            onClose={() => setIsEmergencyModalVisible(false)}
          />

          {/* 마커 클릭 모달 */}
          <BigModal
            visible={isMarkerClicked}
            modalText={"마커를 클릭했습니다!"}
            onClose={() => setIsMarkerClicked(false)}
          />

          {/* 안내 종료 버튼 */}
          <View style={styles.buttonContainer}>
            <PinkButton
              width={250}
              height={70}
              fontSize={42}
              text="안내 종료"
              onPress={onEndPress}
            />
          </View>

          {/* 안내 종료 모달 */}
          <BigModal
            visible={isEndModalVisible}
            modalText={"안내를 종료 하시겠습니까?"}
            onClose={handleEndModalClose}
          />
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  webView: {
    flex: 1,
  },
  emergencyButton: {
    position: "absolute",
    top: 70,
    right: 30,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  emergencyImage: {
    width: 83,
    height: 80,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 30,
    left: "38%",
    right: "40%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default DeNearbyScreen;
