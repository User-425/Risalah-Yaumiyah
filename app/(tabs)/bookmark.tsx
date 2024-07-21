import React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Card } from 'react-native-ui-lib';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: viewportWidth } = Dimensions.get('window');

const carouselItems = [
  { title: 'Beautiful Beach', image: require('@/assets/images/image_1.jpg') },
  { title: 'Mountain View', image: require('@/assets/images/image_2.jpg') },
  { title: 'Cityscape', image: require('@/assets/images/image_3.jpg') },
];

const popularDestinations = [
  { name: 'Paris', image: require('@/assets/images/image_1.jpg') },
  { name: 'New York', image: require('@/assets/images/image_2.jpg') },
  { name: 'Tokyo', image: require('@/assets/images/image_3.jpg') },
];

const featuredIcons = [
  { title: 'Hotels', icon: 'hotel' },
  { title: 'Flights', icon: 'flight' },
  { title: 'Car Rentals', icon: 'directions-car' },
  { title: 'Experiences', icon: 'local-activity' },
  { title: 'Restaurants', icon: 'restaurant' },
  { title: 'More', icon: 'more-horiz' },
];

const renderCarouselItem = ({ item
}) => (
  <View style={styles.carouselItem}>
    <Image source={item.image} style={styles.carouselImage} />
    <Text style={styles.carouselTitle}>{item.title}</Text>
  </View>
);

const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="menu" size={30} color={Colors.black} />
        <Text style={styles.headerTitle}>Explore</Text>
        <Icon name="search" size={30} color={Colors.black} />
      </View>
      <ScrollView>
        <Carousel
          data={carouselItems}
          renderItem={renderCarouselItem}
          sliderWidth={viewportWidth}
          itemWidth={viewportWidth * 0.8}
          loop={true}
        />
        <View style={styles.featuredGrid}>
          {featuredIcons.map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconButton}>
              <Icon name={item.icon} size={40} color={Colors.blue30} />
              <Text style={styles.iconTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.sectionTitle}>Popular Destinations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {popularDestinations.map((destination, index) => (
            <Card key={index} style={styles.card}>
              <Image source={destination.image} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{destination.name}</Text>
            </Card>
          ))}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerTitle: {
    ...Typography.text40,
    fontWeight: 'bold',
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
    paddingVertical: 20,
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
});

export default Home;
