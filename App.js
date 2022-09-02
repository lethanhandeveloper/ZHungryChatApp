import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Auth from "./src/screens/Auth";
import Home from "./src/screens/Home";
import PrivateChat from "./src/screens/PrivateChat";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

// https://www.figma.com/file/qBt2LDAR0VtItMqVqFwYPK/App-Chat-(Community)?node-id=0%3A1
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator
        defaultScreenOptions="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PrivateChat" component={PrivateChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
