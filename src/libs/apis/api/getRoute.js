import axios from 'axios';

// TMap 경로 탐색 API 호출 함수
export const getRoute = async (startX, startY, endX, endY, appKey) => {
  try {
    const response = await fetch(
      "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json",
      {
        method: "POST",
        headers: {
          appKey: appKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startX: startX.toString(),
          startY: startY.toString(),
          endX: endX.toString(),
          endY: endY.toString(),
          reqCoordType: "WGS84GEO",
          resCoordType: "EPSG3857",
          startName: "출발지",
          endName: "도착지",
        }),
      }
    );

    // 응답 상태와 전체 데이터 로깅
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    // 응답을 JSON으로 파싱
    const data = await response.json();

    // JSON 데이터 로깅
    console.log("Parsed Response data:", data);

    // properties 필드 자세히 보기
    if (data.features) {
      data.features.forEach((feature, index) => {
        console.log(`Feature ${index} properties:`, feature.properties);
      });
    } else {
      console.log("No features found in response.");
    }

    // 경로 데이터 반환
    return data.features;

  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
};
