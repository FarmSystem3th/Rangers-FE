import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FirstScreen from './src/pages/FirstPages/FirstScreen';
import DeMainScreen from './src/pages/DependentPages/DeMainScreen';
import GuMainScreen from './src/pages/GuardianPages/GuMainScreen'

export default function App() {
  return (
    <View style={styles.container}>
      {/* 로그인 가입 여부 함수 필요. is 로그인 true 시 -> <FirstScreen/> 
      false 시 -> 피부양자 or 보호자 확인 함수 활용해서 피부양자 경우 -> <DeMainScreen/>, 
      보호자의 경우   */}
      {/* 아래에 <FirstScreen/> <DeMainScreen/> <GuMainScreen/> 
      셋 중 확인 할 페이지로 바꿔서 작업 */}
      <DeMainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
