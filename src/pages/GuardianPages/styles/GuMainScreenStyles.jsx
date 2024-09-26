import { Dimensions, StyleSheet } from "react-native";

const { height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f8",
    padding: 10,
  },

  header: {
    flexDirection: "row", // 가로 방향으로 요소를 나열
    alignItems: "center", // 세로 중심으로 정렬
    width: "100%", // 헤더의 너비를 화면 전체로 설정
  },
  logo: {
    marginTop: 50,
    marginBottom: 10,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  refreshButton: {
    marginTop: 50,
    marginLeft: 350, // 로고와 버튼 사이의 간격
  },

  alertContainer: {
    height: height * 0.15,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  alertText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  familyContainer: {
    height: height * 0.3,
    padding: 20,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 20,
  },
  familyCard: {
    marginBottom: 30,
  },
  familyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  familyDetail: {
    fontSize: 14,
    color: "#34495e",
  },
  moreText: {
    fontSize: 20,
    color: "#2980b9",
    fontWeight: "600",
  },
  extraContainer: {
    height: height * 0.3,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    marginBottom: 20,
  },
  extraCard: {
    height: height * 0.1,
    padding: 15,
    backgroundColor: "#ecf0f1",
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#bdc3c7",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
});

export default styles;
