import axios from "axios";

const API_URL =
  "https://port-0-rangers-be-m1dcjhj379a3cf53.sel4.cloudtype.app/api/path/board";

/**
 * 보호자의 메인 화면에서 연결된 피부양자의 경로 정보를 조회하는 함수
 * @param {number} userId - 보호자의 사용자 ID
 * @returns {Promise<Object[]>} - 경로 정보 리스트
 */
export async function getGuardianPaths(userId) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        userId,
      },
      headers: {
        accept: "*/*",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching guardian paths:", error);
    throw error;
  }
}
