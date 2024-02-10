import { useState, useEffect, useCallback, useRef } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { lightTheme, darkTheme } from "./styles";
import {
  ThemeContext,
  SnackbarContext,
  DefaultSnackbar,
  FavoritesContext,
  DislikedContext,
  ViewedContext,
} from "./contexts";
import { Snackbar } from './components';
import Navigation from "./navigation/navigation";
import { getData, storeData } from './utils';

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
  const [favorites, setFavorites] = useState([]);
  const [disliked, setDisliked] = useState([]);
  const [viewed, setViewed] = useState([]);
  const nav = useRef();

  // Pieces for Theme Context
  const theme = themeName === "Dark" ? darkTheme : lightTheme;
  const saveTheme = async (newThemeName) => {
    setThemeName(newThemeName);
    await storeData("themeName", newThemeName);
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

  const onFavoritePress = async (question) => {
    // console.log('-- Favorite Press!! --');
    const questionId = question.id;
    
    // If already favorited, remove from favorites
    // If not favorited, add to favorites
    if (favorites.includes(questionId)) {
      const newFavorites = favorites.filter((id) => id !== questionId);
      setFavorites(newFavorites);
      setSnackbar({
        message: "Removed from Favorites",
        duration: 2000,
        showCloseIcon: true,
      });
      storeData('favorites', newFavorites);
    } else {
      const newFavorites = [...favorites, questionId];
      setFavorites(newFavorites);
      setSnackbar({
        message: "Added to Favorites",
        duration: 2000,
        showCloseIcon: true,
      });
      storeData('favorites', newFavorites);
    }
  }

  const onDislikePress = async (question) => {
    // console.log('-- Dislike Press!! --');
    const questionId = question.id;
    
    // If already disliked, remove from disliked
    // If not disliked, add to disliked
    if (disliked.includes(questionId)) {
      const newDisliked = disliked.filter((id) => id !== questionId);
      setDisliked(newDisliked);
      setSnackbar({
        message: "Removed from Dislike List",
        duration: 2000,
        showCloseIcon: true,
      });
      storeData('disliked', newDisliked);
    } else {
      const newDisliked = [...disliked, questionId];
      setDisliked(newDisliked);
      setSnackbar({
        message: "Added to Dislike List",
        duration: 2000,
        showCloseIcon: true,
      });
      storeData('disliked', newDisliked);
    }
  }

  const addToViewed = async (question) => {
    // Check if it's already viewed, only need to act if it's not
    if (!viewed.includes(question.id)) {
      const questionId = question.id;
      const newViewed = [...viewed, questionId];
      setViewed(newViewed);
      storeData('viewed', newViewed);
    }
  }

  const removeFromViewed = async (question) => {
    const questionId = question.id;
    const newViewed = viewed.filter((id) => id !== questionId);
    setViewed(newViewed);
    storeData('viewed', newViewed);
  }

  // Fetch user and prepare the app
  useEffect(() => {
    const fetchCurrentTheme = async () => {
      try {
        // const currentTheme = await AsyncStorage.getItem("themeName");
        const currentTheme = await getData("themeName");
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

    const fetchFavorites = async () => {
      const favorites = (await getData('favorites')) || [];
      setFavorites(favorites);
    };

    const fetchDisliked = async () => {
      const disliked = (await getData('disliked')) || [];
      setDisliked(disliked);
    };

    const fetchViewed = async () => {
      const viewed = (await getData('viewed')) || [];
      setViewed(viewed);
    };

    prepare();
    fetchCurrentTheme();
    fetchFavorites();
    fetchDisliked();
    fetchViewed();
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
            <ViewedContext.Provider value={{ viewed, addToViewed, removeFromViewed }}>
              <DislikedContext.Provider value={{ disliked, onDislikePress }}>
                <FavoritesContext.Provider value={{ favorites, onFavoritePress }}>
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
                </FavoritesContext.Provider>
              </DislikedContext.Provider>
            </ViewedContext.Provider>
          </SnackbarContext.Provider>
        </PaperProvider>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}