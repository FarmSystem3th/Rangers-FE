import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import FirstScreen from './src/pages/FirstPages/FirstScreen';

export default function App() {
  return (
    <NavigationContainer>
      <FirstScreen />
    </NavigationContainer>
  );
}
