import { Tabs } from "expo-router";
import React from "react";
import {
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  FontAwesome6,
} from "@expo/vector-icons";
import { CustemStyles } from "../../components/Theme/custemAll";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:CustemStyles.PRIMARY.background
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          
          tabBarIcon: ({ color }) => (
            <Entypo size={26} name="home" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="native"
        options={{
          title: "Native",
          tabBarIcon: ({ color }) => (
            <Entypo size={23} name="shopping-bag" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="rewards"
        options={{
          title: "Reward",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={25} name="gift" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 size={22} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
