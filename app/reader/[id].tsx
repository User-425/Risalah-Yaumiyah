import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import ContentReader from '../../components/ContentReader';
import { getContentById, Content } from '../../modules/contentModule';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

const ReaderScreen = () => {
  const { id } = useLocalSearchParams();
  const [content, setContent] = useState<Content | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    if (id) {
      const fetchedContent = getContentById(Number(id));
      setContent(fetchedContent);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (content) {
      navigation.setOptions({
        title: content.title || 'Reader',
      });
    }
  }, [content]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Loading content...</Text>
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
});

export default ReaderScreen;
