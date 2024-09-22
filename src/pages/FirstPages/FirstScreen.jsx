import React, { useEffect } from "react";
import { SafeAreaView, View, Text, Button, Alert } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import GuMainScreen from "../GuardianPages/GuMainScreen";
import DeMainStack from "../DependentPages/stack/DeMainStack";
import Test from "../DependentPages/Test";

const Stack = createStackNavigator();

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "black", fontSize: 20 }}>
          피그마에 있는 첫 화면이 될 페이지 입니다. {"\n"}
          로그인 정보로 피부양자, 보호자로 나뉠 예정이고, {"\n"}
          우선 버튼으로 페이지 분리했습니다.
        </Text>
        <Button
          title="피부양자 화면"
          onPress={() => navigation.navigate("DeMainStack")} // DeMainStack으로 이동
        />
        <Button
          title="보호자 화면"
          onPress={() => navigation.navigate("GuMain")}
        />
        <Button
          title="테스트 화면"
          onPress={() => navigation.navigate("Test")}
        />
      </View>
    </SafeAreaView>
  );
};

const FirstScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }} // MainScreen의 헤더 숨기기
      />
      <Stack.Screen
        name="DeMainStack" // DeMainStack 등록
        component={DeMainStack} // DeMainStack 컴포넌트 추가
        options={{ headerShown: false }} // DeMainStack의 헤더 숨기기
      />
      <Stack.Screen
        name="GuMain"
        component={GuMainScreen}
        options={{ headerShown: false }} // GuMainScreen의 헤더 숨기기
      />
      <Stack.Screen
        name="Test"
        component={Test}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default FirstScreen;
