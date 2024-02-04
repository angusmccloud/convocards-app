import { useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { lightTheme, darkTheme } from "./styles";
import {
  ThemeContext,
  SnackbarContext,
  DefaultSnackbar,
} from "./contexts";
import { Snackbar } from './components';
import Navigation from "./navigation/navigation";

const customFonts = {
  'SourceSansPro-Black': require('./assets/fonts/SourceSansPro-Black.ttf'),
  'SourceSansPro-BlackItalic': require('./assets/fonts/SourceSansPro-BlackItalic.ttf'),
  'SourceSansPro-Bold': require('./assets/fonts/SourceSansPro-Bold.ttf'),
  'SourceSansPro-BolcItalic': require('./assets/fonts/SourceSansPro-BoldItalic.ttf'),
  'SourceSansPro-ExtraLight': require('./assets/fonts/SourceSansPro-ExtraLight.ttf'),
  'SourceSansPro-ExtraLightItalic': require('./assets/fonts/SourceSansPro-ExtraLightItalic.ttf'),
  'SourceSansPro-Italic': require('./assets/fonts/SourceSansPro-Italic.ttf'),
  'SourceSansPro-Light': require('./assets/fonts/SourceSansPro-Light.ttf'),
  'SourceSansPro-LightItalic': require('./assets/fonts/SourceSansPro-LightItalic.ttf'),
  'SourceSansPro-Regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
  'SourceSansPro-SemiBold': require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
  'SourceSansPro-SemiBoldItalic': require('./assets/fonts/SourceSansPro-SemiBoldItalic.ttf'),
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarDetails, setSnackbarDetails] = useState(DefaultSnackbar);
  const [themeName, setThemeName] = useState("Light");
  const nav = useRef();

  // Pieces for Theme snackbar
  const theme = themeName === "Dark" ? darkTheme : lightTheme;
  const saveTheme = async (newThemeName) => {
    setThemeName(newThemeName);
    await AsyncStorage.setItem("themeName", newThemeName);
  };

  // Pieces for the Snackbar Context
  const setSnackbar = (props) => {
    const { message, action, duration = 7000, showCloseIcon = false } = props;
    setSnackbarDetails({
      message: message,
      duration: duration,
      action: action,
      onIconPress: showCloseIcon ? onDismissSnackBar : undefined,
    });
    setShowSnackbar(true);
  };

  const onDismissSnackBar = () => {
    setShowSnackbar(false);
    setSnackbarDetails(DefaultSnackbar);
  };

  // Fetch user and prepare the app
  useEffect(() => {
    const fetchCurrentTheme = async () => {
      try {
        const currentTheme = await AsyncStorage.getItem("themeName");
        if (currentTheme) {
          setThemeName(currentTheme);
        }
      } catch (e) {
        console.log("error fetching current theme", e);
      }
    };

    // const fetchCurrentUser = async () => {
    //   try {
    //     const currentUser = await AsyncStorage.getItem("authStatus");
    //     const userId = JSON.parse(currentUser).userId;
    //     if (currentUser) {
    //       setAuthStatus(JSON.parse(currentUser));
    //       registerForPushNotificationsAsync(userId);
    //     }
    //   } catch (e) {
    //     console.log("error fetching current theme", e);
    //   }
    // };

    const prepare = async () => {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync(customFonts);
      } catch (e) {
        console.log('-- LOADING ERROR DUMMY --');
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
    fetchCurrentTheme();
    // fetchCurrentUser();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // TO-DO: This needs to be removed if doing React Native for Web
  // See: https://docs.expo.dev/router/migrate/from-react-navigation/#eagerly-load-ui
  if (!appIsReady) {
    return null;
  }
  
  return (
    <ThemeContext.Provider value={{ themeName, setThemeName: saveTheme }}>
      <NavigationContainer ref={nav}>
        <PaperProvider theme={theme}>
          <SnackbarContext.Provider
            value={{ snackbar: snackbarDetails, setSnackbar }}
          >
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
              <Navigation />
              <Snackbar
                visible={showSnackbar}
                onDismiss={onDismissSnackBar}
                action={snackbarDetails.action}
                duration={snackbarDetails.duration}
                onIconPress={snackbarDetails.onIconPress}
              >
                {snackbarDetails.message}
              </Snackbar>
            </View>
          </SnackbarContext.Provider>
        </PaperProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}