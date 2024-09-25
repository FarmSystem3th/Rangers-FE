import axios from 'axios'; // axios를 ES6 방식으로 임포트


// 안전 시설 정보를 조회하는 함수
export async function getSafeZones() {
  try {
    const response = await axios.get('https://port-0-rangers-be-m1dcjhj379a3cf53.sel4.cloudtype.app/api/path/safe', {
      headers: {
        'accept': '*/*'
      }
    });

    if (response.status === 200) {
      const safeZones = response.data;
      return safeZones;
    } else {
      console.error(`오류 발생: ${response.status}`);
    }
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
}


