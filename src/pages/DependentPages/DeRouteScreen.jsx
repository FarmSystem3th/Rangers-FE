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
import SmallModal from "./components/SmallModal";
import PinkButton from "./components/PinkButton";
import { getSafeZones } from "../../libs/apis/api/getSafeZones";
import { getDangerZones } from "../../libs/apis/api/getDangerZones";
import { getPedestrianRoute } from "../../libs/apis/api/getPedestrianRoute";
import { getPlacePoiInfo } from "../../libs/apis/api/getPlacePoiInfo";
import { saveRoute } from "../../libs/apis/api/saveRoute";
import { reverseGeocoding } from "../../libs/apis/api/reverseGeocoding";

const DeRouteScreen = ({ route, navigation }) => {
  const [latitude, setLatitude] = useState(null); // 현재 위도
  const [longitude, setLongitude] = useState(null); // 현재 경도
  const [startAddress, setStartAddress] = useState("현재 위치"); // 현재 위치 주소 저장
  const [isEmergencyModalVisible, setIsEmergencyModalVisible] = useState(false); // 긴급 모달 상태
  const [isEndModalVisible, setIsEndModalVisible] = useState(false); // 안내 종료 모달 상태
  const [isSmallModalVisible, setIsSmallModalVisible] = useState(false); // SmallModal 상태
  const [firstDescription, setFirstDescription] = useState(""); // 첫 번째 description 저장
  const [routeData, setRouteData] = useState(null); // fetchRoute의 결과를 저장할 상태
  const [safeZoneData, setSafeZoneData] = useState([]); // 안전 구역 데이터를 저장할 상태
  const [dangerZoneData, setDangerZoneData] = useState([]); // 위험 구역 데이터를 저장할 상태
  const [destinationInfo, setDestinationInfo] = useState(null); // 목적지 정보 저장
  const [mapHTML, setMapHTML] = useState(null); // WebView에 표시할 HTML을 저장할 상태
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
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLatitude(latitude);
            setLongitude(longitude);

            // 역지오코딩으로 현재 위치의 주소 가져오기
            const addressInfo = await reverseGeocoding(
              latitude,
              longitude,
              appKey
            );
            if (addressInfo && addressInfo.addressInfo) {
              const fullAddress = addressInfo.addressInfo.fullAddress;
              setStartAddress(fullAddress);
              console.log("현재 위치의 주소:", fullAddress);
            }

            // 도착지 정보 가져오기
            const poiInfo = await getPlacePoiInfo(destination, appKey);
            if (poiInfo) {
              console.log("검색된 장소의 정보:", poiInfo);
              setDestinationInfo(poiInfo);

              // 길찾기 경로 데이터 가져오기
              const routeOptions = {
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
                  reqCoordType: "WGS84GEO",
                  startName: "%EC%B6%9C%EB%B0%9C",
                  endName: "%EB%8F%84%EC%B0%A9",
                  searchOption: "0",
                  resCoordType: "WGS84GEO",
                  sort: "index",
                },
              };

              const routePoints = await getPedestrianRoute(routeOptions);
              if (routePoints) {
                console.log("경로 데이터:");
                routePoints.forEach((point) => {
                  console.log(
                    `Index: ${point.index}, Coordinates: ${point.coordinates.longitude}, ${point.coordinates.latitude}, Description: ${point.description}`
                  ); // 좌표와 설명을 출력
                });

                // 첫 번째 인덱스의 description 설정
                if (routePoints.length > 0) {
                  setFirstDescription(routePoints[0].description);
                  setIsSmallModalVisible(true); // 첫 번째 인덱스 모달 띄우기
                }

                // WebView에서 폴리라인을 그리기 위한 HTML로 좌표 전달
                const polylineCoords = routePoints.map(
                  (point) =>
                    `new Tmapv2.LatLng(${point.coordinates.latitude}, ${point.coordinates.longitude})`
                );

                const htmlContent = `
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
                          position: new Tmapv2.LatLng(${
                            destinationInfo?.latitude
                          }, ${destinationInfo?.longitude}),
                          icon: "${endMarkerBase64}",
                          iconSize: new Tmapv2.Size(250, 240),
                          map: map
                        });

                        addPolyline();
                      }

                      function addPolyline() {
                        var polyline = new Tmapv2.Polyline({
                          path: [${polylineCoords.join(
                            ", "
                          )}], // 경로 좌표 배열
                          strokeColor: "#213B6D",
                          strokeWeight: 20,
                          map: map // 지도 객체에 폴리라인 추가
                        });
                      }

                      window.onload = function() {
                        initTmap();
                      };
                    </script>
                    <style>
                      body, html { margin: 0; padding: 0; height: 100%; }
                      #map_div { width: 100%; height: 100%; }
                    </style>
                  </head>
                  <body>
                    <div id="map_div"></div>
                  </body>
                  </html>
                `;

                setMapHTML(htmlContent); // WebView에서 사용할 HTML을 업데이트
              }
            }
          }
        );
      } catch (error) {
        console.error("Error fetching location or address:", error);
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
  }, [destination, startAddress, appKey]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.webviewContainer}>
        {mapHTML && (
          <WebView
            originWhitelist={["*"]}
            source={{ html: mapHTML }}
            style={styles.webview}
          />
        )}
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={() => setIsEmergencyModalVisible(true)}
        >
          <Image
            source={require("./assets/emergency.png")}
            style={styles.emergencyImage}
          />
        </TouchableOpacity>

        <BigModal
          visible={isEmergencyModalVisible}
          modalText={"긴급상황이 맞으신가요?"}
          onClose={() => setIsEmergencyModalVisible(false)}
        />

        <BigModal
          visible={isEndModalVisible}
          modalText={"안내를 종료 하시겠습니까?"}
          onClose={() => setIsEndModalVisible(false)}
        />

        {/* 첫 번째 경로 설명을 보여주는 SmallModal */}
        <SmallModal
          visible={isSmallModalVisible}
          modalText={firstDescription}
          onClose={() => setIsSmallModalVisible(false)}
        />

        <View style={styles.buttonContainer}>
          <PinkButton
            width={250}
            height={70}
            fontSize={42}
            text="안내 종료"
            onPress={() => setIsEndModalVisible(true)}
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
