import React from 'react';
import { Tabs } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet } from 'react-native';

const TabBarIcon = ({ name, color }) => {
  return <Icon name={name} size={28} color={color} />;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  // const activeTintColor = Colors[colorScheme ?? 'light'].tint;
  // const inactiveTintColor = Colors[colorScheme ?? 'light'].tabIconDefault;
  const activeTintColor = Colors['light'].tint;
  const inactiveTintColor = Colors['light'].tabIconDefault;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIconStyle: styles.tabBarIcon,
        headerShown: false,
      }}
    >
      {tabScreens.map((screen, index) => (
        <Tabs.Screen
          key={index}
          name={screen.name}
          options={{
            title: screen.title,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? screen.icon : `${screen.icon}-outline`} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}

const tabScreens = [
  { name: 'index', title: 'Beranda', icon: 'home' },
  { name: 'bookmark', title: 'Bookmark', icon: 'bookmark-multiple' },
  { name: 'alat', title: 'Alat', icon: 'toolbox' },
  { name: 'setting', title: 'Pengaturan', icon: 'cog' },
];

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.light.background,
    borderTopWidth: 0,
    elevation: 10,
    height: 60,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    paddingBottom: 5,
  },
  tabBarIcon: {
    marginTop: 5,
  },
});
