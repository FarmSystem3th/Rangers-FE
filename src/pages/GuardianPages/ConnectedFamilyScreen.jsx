import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import styles from "./styles/ConnectedFamilyScreenStyles";

const familyDetails = [
  {
    id: "1",
    name: "김남범님",
    status: "다나와병원에서 수술 중 관찰구로 이동을 시작했습니다.",
  },
  { id: "2", name: "나비님", status: "동국대학교에 도착했습니다." },
  {
    id: "3",
    name: "김정하님",
    status: "행사장에서 학부모 미팅에 참석하였습니다.",
  },
];

const ConnectedFamilyScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={familyDetails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddFamilyMember")}
      >
        <Text style={styles.buttonText}>다른 가족 연결하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ConnectedFamilyScreen;
