import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Card, Colors, Spacings } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getContents, getSurahList } from '../../modules/quranModule';
import { router } from 'expo-router';
import Header from '../../components/Header';

interface AyaData {
  aya_id: number;
  aya_number: number;
  aya_text: string;
  sura_id: number;
  juz_id: number;
  page_number: number;
  translation_aya_text: string;
}

interface SurahData {
  surah_name: string;
  surah_text: string;
  translation_surah_text: string;
  aya_count: number;
}

interface Content {
  [key: string]: AyaData[];
}

interface ListSurah {
  [key: string]: SurahData;
}

const Quran: React.FC = () => {
  const navigation = useNavigation();
  const content = getContents();
  const surahList = getSurahList();

  const handleSelect = async (id: number) => {
    router.push(`quran/${id}`);
    const selectedItem = content[id.toString()];
    if (selectedItem) {
      const recentlyOpened = JSON.parse(await AsyncStorage.getItem('recentlyOpened') || '[]');
      const updatedRecentlyOpened = [selectedItem, ...recentlyOpened.filter((item: any) => item.sura_id !== id)];
      await AsyncStorage.setItem('recentlyOpened', JSON.stringify(updatedRecentlyOpened));
    }
  };

  const renderItem = ({ item }: { item: [string, SurahData] }) => {
    const [key, value] = item;
    if (!value) return null;

    return (
      <Card
        margin-10
        padding-20
        backgroundColor={Colors.white}
        elevation={5}
        borderRadius={20}
        onPress={() => handleSelect(parseInt(key))}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <Icon name="book" size={30} color={Colors.primary} style={styles.icon} />
          <View style={styles.textContainer}>
            <Text style={styles.surahName}>{value.surah_name}</Text>
            <Text style={styles.surahText}>{value.surah_text}</Text>
            <Text style={styles.translationText}>{value.translation_surah_text}</Text>
            <Text style={styles.ayaCount}>Ayahs: {value.aya_count}</Text>
          </View>
        </View>
      </Card>
    );
  };

  const surahEntries = Object.entries(surahList);

  return (
    <View style={styles.container}>
      <View>
        <Header title="Al-Qur'an" />
      </View>
      <FlatList
        data={surahEntries}
        renderItem={renderItem}
        keyExtractor={(item) => item[0]}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    paddingVertical: 10,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacings.s3,
  },
  icon: {
    marginRight: Spacings.s3,
  },
  textContainer: {
    flex: 1,
  },
  surahName: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.primary,
  },
  surahText: {
    fontSize: 18,
    color: Colors.dark20,
    marginTop: Spacings.s1,
  },
  translationText: {
    fontSize: 16,
    color: Colors.grey50,
    marginTop: Spacings.s1,
  },
  ayaCount: {
    fontSize: 16,
    color: Colors.dark30,
    marginTop: Spacings.s1,
  },
});

export default Quran;
