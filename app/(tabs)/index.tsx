import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Card } from 'react-native-ui-lib';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import Header from '../../components/Header';
import { useRouter } from 'expo-router';

import 'moment/locale/id';
import 'moment-hijri';

import ContentList from '../../components/ContentList';
import { getContents, Content } from '../../modules/contentModule';

const { width: viewportWidth } = Dimensions.get('window');

const carouselItems = [
  { title: 'Beautiful Beach', image: require('@/assets/images/image_1.jpg') },
  { title: 'Do\'a Sehari-hari', image: require('@/assets/images/doa.jpg') },
  { title: 'Alqur\'an', image: require('@/assets/images/alquran.png') },
];

const featuredIcons = [
  { title: 'Al-Qur\'an', icon: 'book' },
  { title: 'Jadwal Shalat', icon: 'alarm' },
  { title: 'Kalender', icon: 'calendar-today' },
];

const renderCarouselItem = ({ item }) => (
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
  const [recentlyOpened, setRecentlyOpened] = useState<Content[]>([]);
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      setCurrentTime(now.format('HH:mm:ss'));
      setCurrentDate(now.format('dddd, DD MMMM YYYY'));
      setCurrentHijriDate(now.format('iYYYY/iM/iD'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setContents(getContents());
  }, []);

  useEffect(() => {
    const loadRecentlyOpened = async () => {
      const storedData = await AsyncStorage.getItem('recentlyOpened');
      if (storedData) {
        setRecentlyOpened(JSON.parse(storedData));
      }
    };

    loadRecentlyOpened();
  }, []);

  const handleSelect = async (id: number) => {
    router.push(`reader/${id}`);
    const selectedItem = contents.find(content => content.id === id);
    if (selectedItem) {
      const updatedRecentlyOpened = [selectedItem, ...recentlyOpened.filter(item => item.id !== id)];
      setRecentlyOpened(updatedRecentlyOpened);
      await AsyncStorage.setItem('recentlyOpened', JSON.stringify(updatedRecentlyOpened));
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Header title="Beranda" />
      </View>
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
            <Card key={index} style={styles.card} onPress={() => handleSelect(item.id)}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </Card>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>More Items</Text>
        <ContentList contents={contents} onSelect={handleSelect} />
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
