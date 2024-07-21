import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Content } from '../modules/contentModule';

const ContentReader = ({ content }: { content: Content }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{content.title}</Text>
      <Text style={styles.text}>{content.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
  },
});

export default ContentReader;
