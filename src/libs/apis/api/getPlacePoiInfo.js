import axios from 'axios';

/**
 * TMap 장소 검색 API를 사용하여 키워드로 장소 검색을 수행하고 POI ID와 좌표 정보를 반환하는 함수
 * @param {string} keyword - 검색할 장소 키워드 (예: 카페, 식당, 특정 장소명)
 * @param {string} appKey - TMap API Key
 * @returns {Object|null} - 검색된 첫 번째 장소의 POI ID와 좌표 정보 (없을 경우 null)
 */
export async function getPlacePoiInfo(keyword, appKey) {
  try {
    const response = await axios.get('https://apis.openapi.sk.com/tmap/pois', {
      params: {
        version: 1,
        searchKeyword: keyword, // 검색할 장소 이름 또는 키워드
        appKey: appKey, // TMap API 키
        resCoordType: 'WGS84GEO', // 좌표 타입
      },
    });

    if (response.status === 200) {
      const places = response.data.searchPoiInfo.pois.poi;

      if (places.length > 0) {
        const firstPlace = places[0];
        const poiInfo = {
          poiId: firstPlace.id, // POI ID
          name: firstPlace.name, // 장소 이름
          latitude: firstPlace.frontLat, // 위도
          longitude: firstPlace.frontLon, // 경도
        };

        console.log(
          `POI Name: ${poiInfo.name}, POI ID: ${poiInfo.poiId}, Latitude: ${poiInfo.latitude}, Longitude: ${poiInfo.longitude}`
        );
        return poiInfo; // 첫 번째 장소의 정보(POI ID와 좌표)를 반환
      } else {
        console.log('No places found.');
        return null;
      }
    } else {
      console.error('API 요청 오류:', response.status);
      return null;
    }
  } catch (error) {
    console.error('API 요청 실패:', error);
    return null;
  }
}
