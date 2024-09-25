import axios from 'axios';

// 길찾기 정보를 저장하는 함수
export async function savePath(userId, start, end) {
  try {
    const response = await axios.post('https://port-0-rangers-be-m1dcjhj379a3cf53.sel4.cloudtype.app/api/path/save', {
      userId: userId,
      start: start,
      end: end
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    });

    if (response.status === 200) {
      const pathData = response.data;
      console.log("길찾기 정보 저장 성공:", pathData);
      return pathData;
    } else {
      console.error(`오류 발생: ${response.status}`);
    }
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
}
