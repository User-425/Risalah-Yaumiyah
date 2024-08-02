import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { getBookmarks } from '../../modules/bookmarkModule';
import { getSurahById } from '../../modules/quranModule';
import { getContentById} from '../../modules/contentModule';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const BookmarkScreen = () => {
  const [bookmarkedContent, setBookmarkedContent] = useState<{ id: number; type: string; title?: string }[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchBookmarkedContent = async () => {
    setRefreshing(true);
    try {
      const bookmarks = await getBookmarks();
      const contentList = await Promise.all(
        bookmarks.map(async (bookmark) => {
          let title: string | undefined;
          if (bookmark.type === 'alquran') {
            const surah = getSurahById(bookmark.id_key);
            title = surah?.surah_name || 'No Title';
          } else {
            const content = getContentById(bookmark.id_key);
            title = content?.title || 'No Title';
          }
          return { id: bookmark.id_key, type: bookmark.type, title };
        })
      );
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

  const handlePress = (id: number, type: string) => {
    if (type === 'alquran') {
      router.push(`quran/${id}`);
    } else {
      router.push(`reader/${id}`);
    }
  };

  const keyExtractor = (item: { id: number }) => item.id.toString();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarked</Text>
      <FlatList
        data={bookmarkedContent}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item.id, item.type)}>
            <View style={styles.item}>
              <Text>{item.title || 'No Title'}</Text>
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
