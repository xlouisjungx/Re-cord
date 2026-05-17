import { Stack } from 'expo-router';
import React from 'react';
import { LogProvider } from './context/LogContext'; // 최상위 경로에 맞게 ./ 로 수정

export default function RootLayout() {
  return (
    <LogProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </LogProvider>
  );
}
