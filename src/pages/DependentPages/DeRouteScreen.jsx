import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import { WebView } from "react-native-webview";
import useImageToBase64 from "./hooks/useImageToBase64";
import * as Location from "expo-location";
import BigModal from "./components/BigModal";
import PinkButton from "./components/PinkButton";

const DeRouteScreen = ({ navigation }) => {
  const [latitude, setLatitude] = useState(null); // 현재 위도
  const [longitude, setLongitude] = useState(null); // 현재 경도
  const [isEmergencyModalVisible, setIsEmergencyModalVisible] = useState(false); // 긴급 모달 상태
  const [isEndModalVisible, setIsEndModalVisible] = useState(false); // 안내 종료 모달 상태
  const appKey = "EDhNkmXDhZ6Vec82hJfcS4JbTCOk5GET8y2cFrGQ"; // TMap API Key

  const destination = {
    lat: 37.5351667, // 테스트용 위도
    lon: 127.0722132, // 테스트용 경도
  };

  const { imageBase64: startMarkerBase64, error: startMarkerError } =
    useImageToBase64(require("../DependentPages/assets/start.png"));
  const { imageBase64: endMarkerBase64, error: endMarkerError } =
    useImageToBase64(require("../DependentPages/assets/end.png"));

  useEffect(() => {
    const startWatchingPosition = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Location permission is required.");
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 3000, // 위치 업데이트 간격
          distanceInterval: 1, // 최소 이동 거리
        },
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        }
      );
    };

    startWatchingPosition();
  }, []);

  if (startMarkerError || endMarkerError) {
    return (
      <View style={styles.container}>
        <Text>
          Error loading image:{" "}
          {startMarkerError?.message || endMarkerError?.message}
        </Text>
      </View>
    );
  }

  const mapHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <title>Nearby Map</title>
      <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=${appKey}"></script>
      <script type="text/javascript">
        var map;

        function fetchRoute() {
          return fetch("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json", {
            method: "POST",
            headers: {
              appKey: "${appKey}",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              startX: ${longitude},
              startY: ${latitude},
              endX: ${destination.lon},
              endY: ${destination.lat},
              reqCoordType: "WGS84GEO",
              resCoordType: "EPSG3857",
              startName: "출발지",
              endName: "도착지"
            })
          })
          .then(response => response.json())
          .then(data => data.features)
          .catch(error => console.error("Error fetching route:", error));
        }

        async function initTmap(){
          map = new Tmapv2.Map("map_div", {
            center: new Tmapv2.LatLng(${latitude}, ${longitude}),
            width: "100%",
            height: "100%",
            zoom: 19
          });

          var marker_s = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(${latitude}, ${longitude}),
            icon: "${startMarkerBase64}",
            iconSize: new Tmapv2.Size(250, 240),
            map: map
          });

          var marker_e = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(${destination.lat}, ${destination.lon}),
            icon: "${endMarkerBase64}",
            iconSize: new Tmapv2.Size(250, 240),
            map: map
          });

          const routeData = await fetchRoute();

          if (routeData) {
            var polylineCoords = routeData.map(function(feature) {
              return new Tmapv2.LatLng(
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0]
              );
            });

            var polyline = new Tmapv2.Polyline({
              path: polylineCoords,
              strokeColor: "#dd00dd",
              strokeWeight: 6,
              strokeStyle: "solid",
              map: map
            });
          }
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

  const onEmergencyPress = () => {
    setIsEmergencyModalVisible(true); // 긴급 모달 표시
  };

  const onEndPress = () => {
    setIsEndModalVisible(true); // 안내 종료 모달 표시
  };

  const handleEndModalClose = (answer) => {
    if (answer === "yes") {
      navigation.navigate("DeMain"); // DeMainScreen으로 이동
    }
    setIsEndModalVisible(false); // 안내 종료 모달 닫기
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webviewContainer}>
        <WebView
          originWhitelist={["*"]}
          source={{ html: mapHTML }}
          style={styles.webview}
        />
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={onEmergencyPress}
        >
          <Image
            source={require("./assets/emergency.png")} // 경로 수정
            style={styles.emergencyImage}
          />
        </TouchableOpacity>

        {/* 긴급 모달 */}
        <BigModal
          visible={isEmergencyModalVisible}
          modalText={"긴급상황이 맞으신가요?"}
          onClose={() => setIsEmergencyModalVisible(false)} // 긴급 모달 닫기
        />

        {/* 안내 종료 모달 */}
        <BigModal
          visible={isEndModalVisible}
          modalText={"안내를 종료 하시겠습니까?"}
          onClose={handleEndModalClose} // 안내 종료 모달의 "예" 또는 "아니오" 처리
        />

        {/* 안내 종료 버튼 */}
        <View style={styles.buttonContainer}>
          <PinkButton
            width={250}
            height={70}
            fontSize={42}
            text="안내 종료"
            onPress={onEndPress} // 안내 종료 버튼 클릭 시
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  webviewContainer: {
    width: "100%",
    height: "100%",
  },
  webview: {
    width: "100%",
    height: "100%",
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

export default DeRouteScreen;
