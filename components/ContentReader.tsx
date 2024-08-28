import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import * as Font from 'expo-font';
import { Content } from '../modules/contentModule';

interface ContentItem {
  type: string;
  variables?: { name: string; value: string }[];
  content: string[];
  dir: string;
  columns?: number;
}

interface ContentReaderProps {
  content: Content;
}

const ContentReader: React.FC<ContentReaderProps> = ({ content }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'LPMQ': require('../assets/fonts/LPMQ.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  
  const renderContentItem = ({ item }: { item: ContentItem }) => {
    const textStyle = [
      item.dir === 'rtl' ? { fontFamily: 'LPMQ' } : {},
      item.variables?.some(varItem => varItem.name === 'bold' && varItem.value === 'true')
        ? styles.bold
        : {},
      item.variables?.some(varItem => varItem.name === 'italic' && varItem.value === 'true')
        ? styles.italic
        : {},
    ];

    switch (item.type) {
      case 'subHeader':
        return (
          <View style={styles.subHeaderContainer}>
            <Text style={[styles.subHeader, ...textStyle]}>{item.content[0]}</Text>
          </View>
        );
      case 'Table':
        return (
          <View style={styles.tableContainer}>
            {/* Create rows for the table */}
            <Table borderStyle={styles.tableBorder}>
              <Rows
                data={formatTableData(item.content, item.columns)}
                textStyle={textStyle}
              />
            </Table>
          </View>
        );
      case 'Paragraph':
        return (
          <View style={styles.paragraphContainer}>
            {item.content.map((text, index) => (
              <Text key={index} style={[styles.paragraphText, ...textStyle]}>
                {text}
              </Text>
            ))}
          </View>
        );
      default:
        return null;
    }
  };

  const formatTableData = (content: string[], columns?: number) => {
    const rows = [];
    if (columns) {
      for (let i = 0; i < content.length; i += columns) {
        rows.push(content.slice(i, i + columns));
      }
    } else {
      rows.push(content);
    }
    return rows;
  };

  return (
    <FlatList
      data={content.content}
      renderItem={renderContentItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  subHeaderContainer: {
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tableContainer: {
    marginBottom: 10,
  },
  tableBorder: {
    borderColor: '#ddd',
    borderWidth: 1,
  },
  tableText: {
    fontSize: 16,
    padding: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  paragraphContainer: {
    marginBottom: 10,
  },
  paragraphText: {
    fontSize: 16,
  },
});

export default ContentReader;
