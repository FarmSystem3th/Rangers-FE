import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GuMainScreen from "../GuMainScreen";
import ConnectedFamilyScreen from "../ConnectedFamilyScreen";

const Stack = createStackNavigator();

const GuMainStack = () => {
  return (
    <Stack.Navigator initialRouteName="GuMain">
      <Stack.Screen
        name="GuMain"
        component={GuMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConnectedFamilyScreen"
        component={ConnectedFamilyScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default GuMainStack;
