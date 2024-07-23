import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Colors, Card, Button } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';

const bookmarks = [
  { id: '1', title: 'Al-Fatiha', description: 'The Opening' },
  { id: '2', title: 'Al-Baqara', description: 'The Cow' },
  { id: '3', title: 'Al-Ikhlas', description: 'The Purity' },
  // Add more bookmarks as needed
];

const BookmarkScreen = () => {
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <Icon name="bookmark" size={30} color={Colors.blue30} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="delete" size={30} color={Colors.red30} />
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bookmarks</Text>
      <FlatList
        data={bookmarks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
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
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: Colors.grey60,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: Colors.grey40,
  },
});

export default BookmarkScreen;