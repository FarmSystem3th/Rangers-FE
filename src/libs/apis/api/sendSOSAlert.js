import axios from 'axios';

const API_URL = 'https://port-0-rangers-be-m1dcjhj379a3cf53.sel4.cloudtype.app/api/sos';

/**
 * SOS 알림을 전송하는 함수
 * @param {number} dependantId - 피부양자의 ID
 * @param {string} currentLocation - 현재 위치 정보
 * @param {string} trackingLink - 위치 추적 링크
 * @returns {Promise<Object>} - SOS 알림 전송 결과
 */
export async function sendSOSAlert(dependantId, currentLocation, trackingLink) {
  try {
    const response = await axios.post(API_URL, {
      dependantId,
      currentLocation,
      trackingLink,
    }, {
      headers: {
        'Content-Type': 'application/json',
        accept: '*/*',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending SOS alert:', error);
    throw error;
  }
}
