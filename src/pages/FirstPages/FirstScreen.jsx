import React from "react";
import { SafeAreaView, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DeMainStack from "../DependentPages/stack/DeMainStack"; // DeMainStack 경로 확인
import GuMainStack from "../GuardianPages/stack/GuMainStack";
import BlueButton from "../DependentPages/components/BlueButton";
import YellowButton from "../DependentPages/components/YellowButton";

const Stack = createStackNavigator();

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFF", justifyContent: "center" }} // SafeAreaView를 화면 중앙에 배치
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <YellowButton
          width={250}
          height={70}
          fontSize={42}
          text="피부양자"
          onPress={() => navigation.navigate("DeMainStack")}
        />
        <BlueButton
          width={250}
          height={70}
          fontSize={42}
          text="보호자"
          onPress={() => navigation.navigate("GuMainStack")}
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
        name="DeMainStack"
        component={DeMainStack}
        options={{ headerShown: false }} // DeMainStack의 헤더 숨기기
      />
      <Stack.Screen
        name="GuMainStack"
        component={GuMainStack}
        options={{ headerShown: false }} // GuMainStack의 헤더 숨기기
      />
    </Stack.Navigator>
  );
};

export default FirstScreen;
