import axios from 'axios'; // axios를 ES6 방식으로 임포트

// 위험 구역 정보를 조회하는 함수
export async function getDangerZones() {
  try {
    const response = await axios.get('https://port-0-rangers-be-m1dcjhj379a3cf53.sel4.cloudtype.app/api/path/danger', {
      headers: {
        'accept': '*/*'
      }
    });

    if (response.status === 200) {
      const dangerZones = response.data; // 위험 구역 데이터 저장
      return dangerZones;
    } else {
      console.error(`오류 발생: ${response.status}`);
    }
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
}
