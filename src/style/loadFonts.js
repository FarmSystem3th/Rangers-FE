import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

const useFonts = async () => {
  await Font.loadAsync({
    'Gmarket-Sans-Light': require('../assets/fonts/GmarketSansTTFLight.ttf'), 
    'Gmarket-Sans-Medium': require('../assets/fonts/GmarketSansTTFMedium.ttf'),
    'Gmarket-Sans-Bold': require('../assets/fonts/GmarketSansTTFBold.ttf'),
  });
};

export const useLoadFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        await useFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.error('Failed to load fonts:', error);
      }
    };
    load();
  }, []);

  return fontsLoaded;
};
