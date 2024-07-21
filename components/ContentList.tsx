import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Content } from '../modules/contentModule';

const ContentList = ({ contents, onSelect }: { contents: Content[], onSelect: (id: number) => void }) => {
  return (
    <View style={styles.listContainer}>
      {contents.map((content) => (
        <TouchableOpacity key={content.id} onPress={() => onSelect(content.id)} style={styles.item}>
          <Text style={styles.itemText}>{content.title}</Text>
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
});

export default ContentList;
