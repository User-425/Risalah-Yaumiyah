import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Card } from 'react-native-ui-lib';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import Header from '../../components/Header';

import 'moment/locale/id';
import 'moment-hijri';

import ContentList from '../../components/ContentList';
import content from '../../assets/data/content.json';


const { width: viewportWidth } = Dimensions.get('window');

const carouselItems = [
  { title: 'Beautiful Beach', image: require('@/assets/images/image_1.jpg') },
  { title: 'Do\'a Sehari-hari', image: require('@/assets/images/doa.jpg') },
  { title: 'Alqur\'an', image: require('@/assets/images/alquran.png') },
];

const recentOpened = [
  { name: 'Istighosah' },
  { name: 'Yasin Fadhilah' },
  { name: 'Do\'a Setelah Adzan' },
];

const featuredIcons = [
  { title: 'Al-Qur\'an', icon: 'book' },
  { title: 'Jadwal Shalat', icon: 'alarm' },
  { title: 'Kalender', icon: 'calendar-today' },
];

const textItems = [
  { title: 'Istighosah' },
  { title: 'Tahlil' },
  { title: 'Dziba\'' },
  { title: 'Bacaan ' },
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

  const [contents, setContents] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = moment();
      setCurrentTime(now.format('HH:mm:ss'));
      setCurrentDate(now.format('dddd, DD MMMM YYYY'));
      setCurrentHijriDate(now.format('iYYYY/iM/iD'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Header title="Beranda" />
      </View>
      <ScrollView>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{currentTime}</Text>
          <Text style={styles.dateText}>{currentDate}</Text>
          <Text style={styles.hijriDateText}>(tanggal hijriyah)</Text>
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
          {recentOpened.map((destination, index) => (
            <Card key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{destination.name}</Text>
            </Card>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>More Items</Text>
        <View style={styles.textItemList}>
          {textItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.textItem}>
              <Text style={styles.textItemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.container}>
          <ContentList contents={contents} onSelect={handleSelect} />
        </View>
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
