import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { getBookmarks } from '../../modules/bookmarkModule';
import { getContentById, Content } from '../../modules/contentModule';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const BookmarkScreen = () => {
  const [bookmarkedContent, setBookmarkedContent] = useState<Content[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchBookmarkedContent = async () => {
    setRefreshing(true);
    try {
      const bookmarks = await getBookmarks();
      const contentList = bookmarks.map(id => getContentById(Number(id)));
      setBookmarkedContent(contentList);
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBookmarkedContent();
    }, [])
  );

  const handleRefresh = () => {
    fetchBookmarkedContent();
  };

  const handlePress = (id: number) => {
    router.push(`reader/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarked Content</Text>
      <FlatList
        data={bookmarkedContent}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id)}>
            <View style={styles.item}>
              <Text>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});

export default BookmarkScreen;
