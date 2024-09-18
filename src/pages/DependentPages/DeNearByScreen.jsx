import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import Constants from "expo-constants";

const DeNearbyScreen = () => {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>Nearby Map</title>
    <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=EDhNkmXDhZ6Vec82hJfcS4JbTCOk5GET8y2cFrGQ"></script>
    <script type="text/javascript">
      var map, marker;
      function initTmap(){
        map = new Tmapv2.Map("map_div", {
          center: new Tmapv2.LatLng(37.56520450, 126.98702028),
          width: "100%",
          height: "100%",
          zoom: 17
        });

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function(position) {
              var lat = position.coords.latitude;
              var lon = position.coords.longitude;

              var content = "<div style='position: relative; border-bottom: 1px solid #dcdcdc; line-height: 18px; padding: 0 35px 2px 0;'>"
                + "<div style='font-size: 12px; line-height: 15px;'>"
                + "<span style='display: inline-block; width: 14px; height: 14px; background-image: url(/resources/images/common/icon_blet.png); vertical-align: middle; margin-right: 5px;'></span>현재 위치"
                + "</div>" + "</div>";

              marker = new Tmapv2.Marker({
                position: new Tmapv2.LatLng(lat, lon),
                map: map
              });

              var InfoWindow = new Tmapv2.InfoWindow({
                position: new Tmapv2.LatLng(lat, lon),
                content: content,
                type: 2,
                map: map
              });

              map.setCenter(new Tmapv2.LatLng(lat, lon));
              map.setZoom(15);
            },
            function(error) {
              console.error("Geolocation error: " + error.message);
            }
          );
        }
      }
    </script>
    <style>
      body, html { margin: 0; padding: 0; height: 100%; }
      #map_div { width: 100%; height: 100%; }
    </style>
    </head>
    <body onload="initTmap()">
      <div id="map_div"></div>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent }}
        style={styles.webView}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  webView: {
    flex: 1,
  },
});

export default DeNearbyScreen;
