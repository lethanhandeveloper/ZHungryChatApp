import React from "react";
import { View, Text, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PrivateChatTab from "./PrivateChatTab";
import GroupChatTab from "./GroupChatTab";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
      
        name="PrivateChatTab"
        component={PrivateChatTab}
        options={{
            
          tabBarLabel: () => {
            return null;
          },
          tabBarIcon: () => (
            <Image
              resizeMode="contain"
              source={require("../../assets/images/icons/Vector-1.png")}
              style={{ width: 25, height: 25 }}
            />
          ),
        }}
      />
      <Tab.Screen name="GroupChatTab" component={GroupChatTab} 
           options={{
            tabBarLabel: () => {
              return null;
            },
            tabBarIcon: () => (
              <Image
                resizeMode="contain"
                source={require("../../assets/images/icons/Vector.png")}
                style={{ width: 25, height: 25 }}
              />
            ),
            activeTintColor: '#81B247'
          }} 
          
      />
    </Tab.Navigator>
  );
};

export default Home;
