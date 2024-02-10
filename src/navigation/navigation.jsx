import React from "react";
import { StatusBar, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "react-native-paper";
import {
  HomeScreen,
  QuestionScreen,
} from "../screens";

const HomeStack = createNativeStackNavigator();

// Single set of screen options for all tabs
const getScreenOptions = () => {
  const theme = useTheme();
  return {
    headerStyle: {
      backgroundColor: theme.colors.primary,
      borderBottomWidth: 0,
      shadowOffset: { height: 0, width: 0 },
    },
    headerTintColor: theme.colors.onPrimary,
    headerTitleAlign: "center",
  };
}

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={getScreenOptions()} >
      <HomeStack.Screen name="Home" component={HomeScreen} options={({ route }) => ({ title: 'Convo Cards' })} />
      <HomeStack.Screen name="Question Screen" component={QuestionScreen} options={({ route }) => ({ title: 'Start Chatting' })} />
    </HomeStack.Navigator>
  );
};

const Navigation = () => {
  const theme = useTheme();

  return (
    <>
      <StatusBar
        backgroundColor={theme.colors.onPrimary}
        barStyle={theme.name === "Dark" ? "light-content" : "dark-content"}
      />
      <HomeStackScreen />
    </>
  );
};

export default Navigation;
