import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContentReader from '../../components/QuranReader';
import { getContentById } from '../../modules/quranModule';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { saveBookmark, removeBookmark, getBookmarks } from '../../modules/bookmarkModule';
import { Colors } from '@/constants/Colors';

interface AyaData {
  aya_id: number;
  aya_number: number;
  aya_text: string;
  sura_id: number;
  juz_id: number;
  page_number: number;
  translation_aya_text: string;
}

interface Content {
  [key: string]: AyaData[];
}

const ReaderScreen = () => {
  const { id } = useLocalSearchParams();
  const [content, setContent] = useState<AyaData[] | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigation = useNavigation();

  const primaryColor = Colors['light'].primary;

  useEffect(() => {
    if (id) {
      const fetchedContent = getContentById(Number(id));
      setContent(fetchedContent);
      setLoading(false);

      const checkBookmark = async () => {
        const bookmarks = await getBookmarks();
        setIsBookmarked(bookmarks.includes(id));
      };
      checkBookmark();
    }
  }, [id]);

  const handleBookmarkToggle = async () => {
    if (isBookmarked) {
      await removeBookmark(id);
    } else {
      await saveBookmark(id);
    }
    setIsBookmarked(!isBookmarked);
  };

  useLayoutEffect(() => {
    if (content) {
      navigation.setOptions({
        title: `Surah ${id}`,
        headerStyle: {
          backgroundColor: primaryColor,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
          color: '#fff',
        },
        headerTintColor: '#fff',
        headerRight: () => (
          <TouchableOpacity onPress={handleBookmarkToggle} style={styles.headerRightButton}>
            <Icon
              name={isBookmarked ? 'bookmark' : 'bookmark-border'}
              size={25}
              color="#fff"
            />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, content, isBookmarked, id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!content) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Content not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <ContentReader content={content} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007bff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  errorText: {
    fontSize: 18,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  headerRightButton: {
    padding: 10,
  },
});

export default ReaderScreen;
