import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Colors, Card } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';

const tools = [
  { title: 'Hijri Calendar', icon: 'calendar-today' },
  { title: 'Prayer Times', icon: 'access-time' },
  { title: 'Qibla Direction', icon: 'explore' },
  { title: 'Nearby Mosques', icon: 'place' },
  { title: 'Islamic Articles', icon: 'library-books' },
  { title: 'Dua & Azkar', icon: 'library-music' },
];

const ToolsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Islamic Tools</Text>
      <ScrollView contentContainerStyle={styles.toolsContainer}>
        {tools.map((tool, index) => (
          <TouchableOpacity key={index} style={styles.cardContainer}>
            <Card style={styles.card}>
              <View style={styles.iconContainer}>
                <Icon name={tool.icon} size={40} color={Colors.blue30} />
              </View>
              <Text style={styles.title}>{tool.title}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  toolsContainer: {
    paddingBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  cardContainer: {
    width: '45%',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: Colors.grey60,
  },
  iconContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ToolsScreen;
