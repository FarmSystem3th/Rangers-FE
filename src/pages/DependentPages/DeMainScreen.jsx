import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useLoadFonts } from "../../style/loadFonts"; // 폰트 로드 파일 경로 확인

const DeMainScreen = () => {
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null; // 폰트가 로딩될 때까지는 아무것도 렌더링하지 않음
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>로고</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.iconContainer}>
            <View style={styles.icon}>
              <View style={styles.iconBar1} />
              <View style={styles.iconBar2} />
            </View>
          </View>
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>
              000님, 안녕하세요 ☺️{"\n"}무엇을 도와 드릴까요?
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <View style={styles.buttonBackgroundYellow} />
              <Text style={styles.buttonTextBlue}>길찾기</Text>
            </View>
            <View style={styles.button}>
              <View style={styles.buttonBackgroundBlue} />
              <Text style={styles.buttonTextYellow}>내 주변 보기</Text>
            </View>
          </View>
          <View style={styles.stripContainer}>
            <View style={styles.strips}>
              {[...Array(12)].map((_, index) => (
                <View key={index} style={styles.strip} />
              ))}
            </View>
            <View style={[styles.strips, { marginLeft: 109 }]}>
              {[...Array(12)].map((_, index) => (
                <View key={index} style={styles.strip} />
              ))}
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
  },
  logoContainer: {
    width: 200,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoText: {
    fontSize: 40,
    fontFamily: "Gmarket-Sans-Bold", // 정확한 폰트 이름 적용
    fontWeight: "500",
    color: "black",
  },
  mainContainer: {
    width: "90%",
    height: "auto",
    alignItems: "center",
  },
  iconContainer: {
    width: 60,
    height: 50,
    marginBottom: 20,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  icon: {
    flexDirection: "row",
  },
  iconBar1: {
    width: 18.75,
    height: 29.17,
    borderWidth: 5,
    borderColor: "black",
    marginRight: 10,
  },
  iconBar2: {
    width: 13.45,
    height: 29.46,
    borderWidth: 5,
    borderColor: "black",
  },
  greetingContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 30,
    fontFamily: "Gmarket-Sans-Medium", // 정확한 폰트 이름 적용
    fontWeight: "700",
    color: "black",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    width: 285,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonBackgroundYellow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#FFEE00",
    borderRadius: 20,
    borderColor: "#213B6D",
    borderWidth: 5,
  },
  buttonTextBlue: {
    color: "#213B6D",
    fontSize: 42,
    fontFamily: "Gmarket-Sans-Bold", // 정확한 폰트 이름 적용
    fontWeight: "700",
    textAlign: "center",
  },
  buttonBackgroundBlue: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#213B6D",
    borderRadius: 20,
    borderColor: "#213B6D",
    borderWidth: 3,
  },
  buttonTextYellow: {
    color: "#FFEC00",
    fontSize: 42,
    fontFamily: "Gmarket-Sans-Bold", // 정확한 폰트 이름 적용
    fontWeight: "700",
    textAlign: "center",
  },
  stripContainer: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  strips: {
    flexDirection: "row",
  },
  strip: {
    width: 43,
    height: 0,
    borderWidth: 6,
    borderColor: "#213B6D",
    transform: [{ rotate: "90deg" }],
    marginHorizontal: 2,
  },
});

export default DeMainScreen;
