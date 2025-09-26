import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
  <ThemeProvider value={DarkTheme}>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="suggestion" options={{ presentation: 'card', title: '', headerBackButtonDisplayMode: 'minimal', headerTransparent: true }} />
      <Stack.Screen name="ficha" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  </ThemeProvider>
  );
}
