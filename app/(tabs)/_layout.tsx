  import React from 'react';
  import { Tabs } from 'expo-router';
  import { TabBarIcon } from '@/components/navigation/TabBarIcon';
  import { Colors } from '@/constants/Colors';
  import { useColorScheme } from '@/hooks/useColorScheme';
  

  export default function TabLayout() {
    const colorScheme = useColorScheme();

    return (
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Beranda',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Bookmark',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'bookmark' : 'bookmark-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="alat"
          options={{
            title: 'Alat',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'construct' : 'construct-outline'} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            title: 'Pengaturan',
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'settings' : 'settings-outline'} color={color} />
            ),
          }}
        />
      </Tabs>
    );
  }
