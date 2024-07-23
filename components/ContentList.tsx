import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Content } from '../modules/contentModule';
import { Colors, Typography, Card } from 'react-native-ui-lib';

const ContentList = ({ contents, onSelect }: { contents: Content[], onSelect: (id: number) => void }) => {
  return (
    <View style={styles.textItemList}>
      {contents.map((content) => (
        <TouchableOpacity key={content.id} onPress={() => onSelect(content.id)} style={styles.textItem}>
          <Text style={styles.textItemTitle}>{content.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
  },
  textItemList: {
    paddingHorizontal: 20,
  },
  textItem: {
    backgroundColor: Colors.grey60,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  textItemTitle: {
    ...Typography.text70,
  },
});

export default ContentList;
