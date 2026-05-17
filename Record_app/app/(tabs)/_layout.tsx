import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: 'none' }, // 탭바 숨김 유지
      }}
    >
      <Tabs.Screen name="mainPage" />
      <Tabs.Screen name="reportPage" />
      <Tabs.Screen name="challengePage" />
      <Tabs.Screen name="blendPage" />
    </Tabs>
  );
}
