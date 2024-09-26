import axios from 'axios';

// Tmap 보행자 길찾기 경로를 조회하는 함수
export async function getPedestrianRoute(options) {
  try {
    const response = await axios.post(
      'https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&callback=function',
      options.body,
      {
        headers: options.headers,
      }
    );

    if (response.status === 200) {
      const routePoints = response.data.features
        .filter(feature => feature.geometry.type === 'Point') // 포인트 타입만 필터링
        .map((feature, index) => {
          const { coordinates } = feature.geometry;
          const description = feature.properties.description || "No description"; // description을 가져옴
          
          // 좌표와 설명을 구조화된 객체로 반환
          return {
            index,
            coordinates: {
              longitude: coordinates[0],
              latitude: coordinates[1],
            },
            description
          };
        });

      return routePoints; // 경유 지점을 객체 형태로 반환
    } else {
      console.error(`오류 발생: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('API 요청 실패:', error);
    return null;
  }
}
