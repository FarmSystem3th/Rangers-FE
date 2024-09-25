import axios from 'axios';

const API_URL = 'https://apis.openapi.sk.com/tmap/geo/reversegeocoding';

/**
 * 역지오코딩을 통해 좌표를 주소로 변환하는 함수
 * @param {number} lat - 위도
 * @param {number} lon - 경도
 * @param {string} appKey - TMap API 키
 * @returns {Promise<Object>} - 주소 정보
 */
export async function reverseGeocoding(lat, lon, appKey) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        version: 1,
        lat: lat,
        lon: lon,
        coordType: 'WGS84GEO',
        addressType: 'A02',
        newAddressExtend: 'Y',
      },
      headers: {
        accept: 'application/json',
        appKey: appKey,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error during reverse geocoding:', error);
    throw error;
  }
}
