import { useFonts } from "expo-font";

export const useLoadFonts = () => {
  const [fontsLoaded] = useFonts({
    'Gmarket-Sans-Light': require('../assets/fonts/GmarketSansTTFLight.ttf'),
    'Gmarket-Sans-Medium': require('../assets/fonts/GmarketSansTTFMedium.ttf'),
    'Gmarket-Sans-Bold': require('../assets/fonts/GmarketSansTTFBold.ttf'),
  });

  return fontsLoaded; 
};
