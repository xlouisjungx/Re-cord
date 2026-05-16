import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }}
    >
      <Tabs.Screen name="mainPage" />
      <Tabs.Screen name="reportPage" />
      <Tabs.Screen name="challengePage" />
      <Tabs.Screen name="blendPage" />
    </Tabs>
  );
}
