// src/api/getStaticMap.js
const appKey = "EDhNkmXDhZ6Vec82hJfcS4JbTCOk5GET8y2cFrGQ"; // 발급 받은 appKey

export const getStaticMap = async (longitude, latitude, zoom, width = 512, height = 512) => {
  const url = `https://apis.openapi.sk.com/tmap/staticMap?version=1&coordType=WGS84GEO&width=${width}&height=${height}&zoom=${zoom}&format=PNG&longitude=${longitude}&latitude=${latitude}&markers=${longitude}%2C${latitude}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      appKey: appKey,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error("Error response:", errorMessage);
      throw new Error("지도 요청 실패");
    }
    return response.blob(); // Blob 형태로 반환
  } catch (error) {
    console.error("지도 로드 실패:", error);
    throw error; // 에러를 다시 던져 호출하는 곳에서 처리할 수 있도록
  }
};
