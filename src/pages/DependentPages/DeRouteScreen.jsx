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
import { getSafeZones } from "../../libs/apis/api/getSafeZones";
import { getDangerZones } from "../../libs/apis/api/getDangerZones";
import { getPedestrianRoute } from "../../libs/apis/api/getPedestrianRoute";
import { getPlacePoiInfo } from "../../libs/apis/api/getPlacePoiInfo";
import { saveRoute } from "../../libs/apis/api/saveRoute"; // 길찾기 저장 API import

const DeRouteScreen = ({ route, navigation }) => {
  const [latitude, setLatitude] = useState(null); // 현재 위도
  const [longitude, setLongitude] = useState(null); // 현재 경도
  const [isEmergencyModalVisible, setIsEmergencyModalVisible] = useState(false); // 긴급 모달 상태
  const [isEndModalVisible, setIsEndModalVisible] = useState(false); // 안내 종료 모달 상태
  const [routeData, setRouteData] = useState(null); // fetchRoute의 결과를 저장할 상태
  const [safeZoneData, setSafeZoneData] = useState([]); // 안전 구역 데이터를 저장할 상태
  const [dangerZoneData, setDangerZoneData] = useState([]); // 위험 구역 데이터를 저장할 상태
  const [destinationInfo, setDestinationInfo] = useState(null); // 목적지 정보 저장
  const appKey = "EDhNkmXDhZ6Vec82hJfcS4JbTCOk5GET8y2cFrGQ"; // TMap API Key

  // PreDeRouteScreen에서 전달된 목적지 텍스트 받기
  const { destination } = route.params;

  const { imageBase64: startMarkerBase64, error: startMarkerError } =
    useImageToBase64(require("../DependentPages/assets/start.png"));
  const { imageBase64: endMarkerBase64, error: endMarkerError } =
    useImageToBase64(require("../DependentPages/assets/end.png"));
  const { imageBase64: safeMarkerBase64, error: safeMarkerError } =
    useImageToBase64(require("../DependentPages/assets/Safe.png"));
  const { imageBase64: dangerMarkerBase64, error: dangerMarkerError } =
    useImageToBase64(require("../DependentPages/assets/Danger.png")); // 위험 구역 마커 이미지 로드

  useEffect(() => {
    let locationSubscription;

    const fetchData = async () => {
      try {
        // 위치 권한 요청
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission denied", "Location permission is required.");
          return;
        }

        // 위치 추적 시작
        locationSubscription = await Location.watchPositionAsync(
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

        // 안전 구역 데이터 가져오기
        const safeZones = await getSafeZones();
        if (safeZones) setSafeZoneData(safeZones);

        // 위험 구역 데이터 가져오기
        const dangerZones = await getDangerZones();
        if (dangerZones) setDangerZoneData(dangerZones);

        // 도착지 정보 데이터 가져오기
        const poiInfo = await getPlacePoiInfo(destination, appKey);
        if (poiInfo) {
          console.log("검색된 장소의 정보:", poiInfo);
          setDestinationInfo(poiInfo); // 목적지 정보 저장
        }

        // 경로와 길찾기 정보 저장
        if (latitude && longitude && poiInfo) {
          // 길찾기 데이터 가져오기
          const options = {
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              appKey,
            },
            body: {
              startX: longitude,
              startY: latitude,
              angle: 20,
              speed: 30,
              endPoiId: poiInfo.poiId,
              endX: poiInfo.longitude,
              endY: poiInfo.latitude,
              passList: "126.92774822,37.55395475_126.92577620,37.55337145",
              reqCoordType: "WGS84GEO",
              startName: "%EC%B6%9C%EB%B0%9C",
              endName: "%EB%8F%84%EC%B0%A9",
              searchOption: "0",
              resCoordType: "WGS84GEO",
              sort: "index",
            },
          };

          const routePoints = await getPedestrianRoute(options);
          if (routePoints) {
            console.log("Route Points Data:", routePoints.join("\n"));
            setRouteData(routePoints);
          }

          // 길찾기 정보를 서버에 저장
          const routeSaveData = {
            userId: 1, // 사용자 ID (예시)
            start: "현재 위치", // 출발지 이름
            end: poiInfo.name, // 목적지 이름
            startLatitude: latitude, // 현재 위치 위도
            startLongitude: longitude, // 현재 위치 경도
            endLatitude: poiInfo.latitude, // 목적지 위도
            endLongitude: poiInfo.longitude, // 목적지 경도
          };

          const savedRoute = await saveRoute(routeSaveData);
          console.log("저장된 길찾기 정보:", savedRoute);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // fetchData는 한 번만 호출되도록 설정
    fetchData();

    // 컴포넌트 언마운트 시 위치 추적 해제
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, [latitude, longitude, destination]); // 목적지, 현재 위치가 변경될 때만 실행

  if (
    startMarkerError ||
    endMarkerError ||
    safeMarkerError ||
    dangerMarkerError
  ) {
    return (
      <View style={styles.container}>
        <Text>
          Error loading image:{" "}
          {startMarkerError?.message ||
            endMarkerError?.message ||
            safeMarkerError?.message ||
            dangerMarkerError?.message}
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

        async function initTmap() {
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
            position: new Tmapv2.LatLng(${destinationInfo?.latitude}, ${
    destinationInfo?.longitude
  }),
            icon: "${endMarkerBase64}",
            iconSize: new Tmapv2.Size(250, 240),
            map: map
          });

          await fetchRoute();
          addSafeMarkers(${JSON.stringify(
            safeZoneData
          )}); // 안전 구역 마커 추가
          addDangerMarkers(${JSON.stringify(
            dangerZoneData
          )}); // 위험 구역 마커 추가
        }
        
        function addSafeMarkers(safeData) {
          safeData.forEach((data) => {
            var marker = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(data.latitude, data.longitude),
              icon: "${safeMarkerBase64}", 
              iconSize: new Tmapv2.Size(150, 150),
              map: map
            });

            marker.addListener("click", function(evt) {
              window.ReactNativeWebView.postMessage("safe_marker_clicked");
            });
          });
        }

        function addDangerMarkers(dangerData) {
          dangerData.forEach((data) => {
            var marker = new Tmapv2.Marker({
              position: new Tmapv2.LatLng(data.latitude, data.longitude),
              icon: "${dangerMarkerBase64}",
              iconSize: new Tmapv2.Size(150, 150),
              map: map
            });

            marker.addListener("click", function(evt) {
              window.ReactNativeWebView.postMessage("danger_marker_clicked");
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

  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    setRouteData(data);
    console.log("Route Data:", data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webviewContainer}>
        <WebView
          originWhitelist={["*"]}
          source={{ html: mapHTML }}
          style={styles.webview}
          onMessage={handleMessage} // 메시지 수신 핸들러 추가
        />
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
          onClose={() => setIsEmergencyModalVisible(false)} // 긴급 모달 닫기
        />

        {/* 안내 종료 모달 */}
        <BigModal
          visible={isEndModalVisible}
          modalText={"안내를 종료 하시겠습니까?"}
          onClose={handleEndModalClose}
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
