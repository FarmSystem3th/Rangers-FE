import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import DependentsText from "../../../style/DependentsText";
import DeMainScreen from "../DeMainScreen";
import DeRouteScreen from "../DeRouteScreen";
import DeNearByScreen from "../DeNearByScreen";
import PreDeRouteScreen from "../PreDeRouteScreen";

const Stack = createStackNavigator();

const DeMainStack = () => {
  return (
    <Stack.Navigator initialRouteName="DeMain">
      <Stack.Screen
        name="DeMain"
        component={DeMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeRouteScreen"
        component={DeRouteScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DeNearByScreen"
        component={DeNearByScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PreDeRouteScreen"
        component={PreDeRouteScreen}
        options={{
          headerTitle: () => (
            <DependentsText style={{ fontSize: 50 }}>길찾기🔍</DependentsText>
          ), // 헤더 제목 설정
        }}
      />
    </Stack.Navigator>
  );
};

export default DeMainStack;
