function fetchRoute() {
          return fetch("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json", {
            method: "POST",
            headers: {
              appKey: "${appKey}",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              startX: ${longitude},
              startY: ${latitude},
              endX: ${destination.lon},
              endY: ${destination.lat},
              reqCoordType: "WGS84GEO",
              resCoordType: "EPSG3857",
              startName: "출발지",
              endName: "도착지"
            })
          })
          .then(response => response.json()) // 응답을 JSON으로 변환
          .then(data => {
            // 좌표 정보를 추출하여 React Native로 전송
            const coordinates = data.features.map(feature => {
              const geometry = feature.geometry;
              if (geometry.type === "Point") {
                return geometry.coordinates; // Point 타입일 경우 좌표 반환
              } else if (geometry.type === "LineString") {
                return geometry.coordinates; // LineString 타입일 경우 좌표 배열 반환
              }
            });

            // React Native로 좌표 데이터를 전달
            window.ReactNativeWebView.postMessage(JSON.stringify(coordinates));

            // 좌표를 이용해 폴리라인을 지도에 그리기
            addPolyline(JSON.stringify(coordinates));
          })
          .catch(error => console.error("Error fetching route:", error));
        }

        function addPolyline(coordinatesArray) {
          coordinatesArray.forEach((coords) => {
            if (coords) {
              const path = coords.map(coord => {
                const [lng, lat] = convertToWGS84(coord); 
                return new Tmapv2.LatLng(lat, lng); 
              });

              var polyline = new Tmapv2.Polyline({
                path: path, 
                strokeColor: "#dd00dd", 
                strokeWeight: 6, 
                direction: true, 
                map: map 
              });
            }
          });
        }