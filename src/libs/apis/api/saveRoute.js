import axios from 'axios';

const API_URL = 'https://port-0-rangers-be-m1dcjhj379a3cf53.sel4.cloudtype.app/api/path/save';

/**
 * 길찾기 정보를 서버에 저장하는 함수
 * @param {Object} routeData - 길찾기 정보
 * @param {number} routeData.userId - 사용자 ID
 * @param {string} routeData.start - 출발 장소명
 * @param {string} routeData.end - 도착 장소명
 * @param {number} routeData.startLatitude - 출발지 위도
 * @param {number} routeData.startLongitude - 출발지 경도
 * @param {number} routeData.endLatitude - 도착지 위도
 * @param {number} routeData.endLongitude - 도착지 경도
 * @returns {Promise<Object>} - 서버의 응답
 */
export async function saveRoute(routeData) {
  try {
    const response = await axios.post(API_URL, {
      userId: routeData.userId,
      start: routeData.start,
      end: routeData.end,
      startLatitude: routeData.startLatitude,
      startLongitude: routeData.startLongitude,
      endLatitude: routeData.endLatitude,
      endLongitude: routeData.endLongitude,
    });
    return response.data;
  } catch (error) {
    console.error('Error saving route:', error);
    throw error;
  }
}
