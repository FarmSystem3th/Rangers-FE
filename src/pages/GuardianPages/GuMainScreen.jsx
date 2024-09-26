import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { getGuardianPaths } from "./getGuardianPaths";
import styles from "./styles/GuMainScreenStyles";
import Icon from "react-native-vector-icons/FontAwesome"; // 아이콘 사용을 위해 추가

const GuMainScreen = ({ navigation }) => {
  const [familyLocation, setFamilyLocation] =
    useState("위치 정보를 불러오는 중...");
  const [dangerCnt, setDangerCnt] = useState(0);
  const [familyMembers, setFamilyMembers] = useState([]); // 가족 데이터를 저장할 상태 추가

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const data = await getGuardianPaths(2); // userId 2로 고정
        if (data.length > 0) {
          const firstPath = data[0];
          setFamilyLocation(
            `${firstPath.dependantNickname}님이 현재 ${firstPath.start}에서 ${firstPath.end}로 이동 중입니다.`
          );
          setDangerCnt(firstPath.dangerCnt);
          setFamilyMembers(data); // 가족 정보 상태에 저장
        } else {
          setFamilyLocation("위치 정보가 없습니다.");
        }
      } catch (error) {
        console.error("위치 정보 불러오기 실패:", error);
        setFamilyLocation("위치 정보를 불러올 수 없습니다.");
      }
    };

    fetchLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./assets/logo.png")} style={styles.logo} />
        <TouchableOpacity
          onPress={() => console.log("Refresh")}
          style={styles.refreshButton}
        >
          <Icon name="refresh" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* 가족 이동 알리미 */}
        <View
          style={styles.alertContainer}
          onPress={() => navigation.navigate("FamilyAlert")}
        >
          <Text style={styles.sectionTitle}>가족 이동 알리미</Text>
          <Text style={styles.alertText}>{familyLocation}</Text>
          <Text style={styles.alertText}>위험 구역 진입 횟수: {dangerCnt}</Text>
        </View>

        {/* 00님과 연결된 가족 */}
        <View style={styles.familyContainer}>
          <Text style={styles.sectionTitle}>00님과 연결된 가족</Text>
          {familyMembers.length > 0 ? (
            familyMembers.map((family, index) => (
              <View key={index} style={styles.familyCard}>
                <Text style={styles.familyName}>
                  {family.dependantNickname}님이 {family.start}에서 {family.end}
                  로 이동 중입니다.
                </Text>
                <Text style={styles.familyDetail}>
                  {new Date(family.startTime).toLocaleString()}
                </Text>
              </View>
            ))
          ) : (
            <Text>연결된 가족이 없습니다.</Text>
          )}
          <TouchableOpacity
            onPress={() => navigation.navigate("ConnectedFamilyScreen")}
          >
            <Text style={styles.moreText}>연결된 가족 현황보기</Text>
          </TouchableOpacity>
        </View>

        {/* 기타 기능 */}
        <View style={styles.extraContainer}>
          <TouchableOpacity style={styles.extraCard}>
            <Text>위험구역 알리기 📷</Text>
            <Text>리워드를 획득할 수 있어요.</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.extraCard}>
            <Text>상점 바로 가기 🏢</Text>
            <Text>리워드를 사용할 수 있어요.</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GuMainScreen;
