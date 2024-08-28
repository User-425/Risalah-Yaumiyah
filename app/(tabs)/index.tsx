import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Card } from 'react-native-ui-lib';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Header from '../../components/Header';
import { useRouter } from 'expo-router';

import 'moment/locale/id';
import 'moment-hijri';
import uq from '@umalqura/core';

import ContentList from '../../components/ContentList';
import { getContentById, getContents, Content } from '../../modules/contentModule';
import { ContentType, saveRecentlyOpened, getRecentlyOpened } from '../../modules/recentlyOpenedModule';
import { getSurahById } from '../../modules/quranModule';

const { width: viewportWidth } = Dimensions.get('window');

const carouselItems = [
  { title: 'Do\'a Sehari-hari', image: require('@/assets/images/doa.jpg') },
  { title: 'Alqur\'an', image: require('@/assets/images/alquran.png') },
];

const featuredIcons = [
  { title: 'Al-Qur\'an', icon: 'book' },
  { title: 'Jadwal Shalat', icon: 'alarm' },
  { title: 'Kalender', icon: 'calendar-today' },
];

const renderCarouselItem = ({ item }: { item: { title: string; image: any } }) => (
  <View style={styles.carouselItem}>
    <Image source={item.image} style={styles.carouselImage} />
    <Text style={styles.carouselTitle}>{item.title}</Text>
  </View>
);

const Home = () => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentHijriDate, setCurrentHijriDate] = useState('');
  const [contents, setContents] = useState<Content[]>([]);
  const [recentlyOpened, setRecentlyOpened] = useState<{ id: number; type: ContentType; title: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      const hijriDate = uq(now.toDate());
      setCurrentTime(now.format('HH:mm:ss'));
      setCurrentDate(now.format('dddd, DD MMMM YYYY'));
      setCurrentHijriDate(hijriDate.format('fullDate', 'ar'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setContents(getContents());
  }, []);

  useEffect(() => {
    const fetchRecentlyOpened = async () => {
      const items = await getRecentlyOpened();
      setRecentlyOpened(items);
    };

    fetchRecentlyOpened();
  }, []);

  const handleRecentlyOpenedSelect = async (id: number, type: ContentType) => {
    try {
      let content, title;
      if (type === 'alquran') {
        content = await getSurahById(id);
        title = content?.surah_name;
      } else {
        content = getContentById(id);
        title = content?.title;
      }

      if (content && title) {
        await saveRecentlyOpened({ id, type, title });

        const updatedItems = await getRecentlyOpened();
        setRecentlyOpened(updatedItems);

        if (type === 'alquran') {
          router.push(`quran/${id}`);
        } else {
          router.push(`reader/${id}`);
        }
      }
    } catch (error) {
      console.error("Error handling recently opened item:", error);
    }
  };

  const handleMoreItemsSelect = async (id: number) => {
    try {
      const content = getContentById(id);
      if (content) {
        await saveRecentlyOpened({ id: content.id, type: 'other', title: content.title });

        const updatedItems = await getRecentlyOpened();
        setRecentlyOpened(updatedItems);

        router.push(`reader/${id}`);
      }
    } catch (error) {
      console.error("Error handling more items selection:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Beranda" />
      <ScrollView>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{currentTime}</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
          <Text style={styles.hijriDateText}>{currentHijriDate}</Text>
        </View>
        <Carousel
          data={carouselItems}
          renderItem={renderCarouselItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth * 0.8}
          autoplay={true}
          loop={true}
        />
        <View style={styles.featuredGrid}>
          {featuredIcons.map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconButton}>
              <Icon name={item.icon} size={25} color={Colors.blue30} />
              <Text style={styles.iconTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Baru Dibuka</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {recentlyOpened.map((item, index) => (
            <Card key={index} style={styles.card} onPress={() => handleRecentlyOpenedSelect(item.id, item.type)}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </Card>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>More Items</Text>
        <ContentList contents={contents} onSelect={handleMoreItemsSelect} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  timeContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  timeText: {
    ...Typography.text30,
    fontWeight: 'bold',
  },
  dateText: {
    ...Typography.text60,
    marginVertical: 5,
  },
  hijriDateText: {
    ...Typography.text70,
    color: Colors.grey50,
  },
  carouselItem: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  carouselImage: {
    width: '100%',
    height: 200,
  },
  carouselTitle: {
    ...Typography.text60,
    color: Colors.white,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  sectionTitle: {
    ...Typography.text50,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  card: {
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  cardImage: {
    width: 150,
    height: 150,
  },
  cardTitle: {
    ...Typography.text70,
    padding: 10,
  },
  featuredGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  iconButton: {
    alignItems: 'center',
    margin: 10,
    width: viewportWidth / 3 - 20,
  },
  iconTitle: {
    ...Typography.text80,
    marginTop: 10,
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

export default Home;
