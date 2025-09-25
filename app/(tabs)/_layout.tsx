import { NativeTabs } from 'expo-router/unstable-native-tabs';
import React from 'react';


export default function TabLayout() {
  // const colorScheme = useColorScheme();

  // return (
  //   <Tabs
  //     screenOptions={{
  //       tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
  //       headerShown: false,
  //       tabBarButton: HapticTab,
  //     }}>
  //     <Tabs.Screen
  //       name="index"
  //       options={{
  //         title: 'Home',
  //         tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
  //       }}
  //     />
  //     <Tabs.Screen
  //       name="explore"
  //       options={{
  //         title: 'Explore',
  //         tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
  //       }}
  //     />
  //   </Tabs>
  // );

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index" options={{
        title: 'Home',
        icon: {sf: "house.fill"},
      }} />
      <NativeTabs.Trigger name="explore" options={{
        title: 'Explore',
        icon: {sf: "paperplane.fill"},
      }} />
    </NativeTabs>
  );
}
