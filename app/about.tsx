// src/screens/About.js
import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Checkbox, Colors, Text, Image } from 'react-native-ui-lib';

import Header from '../components/Header';

const About = () => {
  // State untuk mengelola nilai checkbox
  const [checked, setChecked] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={require('../assets/images/icon.png')}
          style={styles.image}
        />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text text30 style={styles.headerText}>Risalah Yaumiyah</Text>
        </View>
        <View style={styles.content}>
          <Text text70 style={styles.Text}>Adalah aplikasi yang dirancang khusus untuk membantu Anda menjaga
            konsistensi dalam melaksanakan kegiatan sunnah sehari-hari. Aplikasi ini berfungsi sebagai 
            panduan praktis dan pengingat untuk berbagai aktivitas ibadah dan kebaikan yang dianjurkan dalam Islam.</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button 
            label="Learn More" 
            backgroundColor={Colors.blue30} // Ganti dengan warna yang sesuai dengan ikon home Anda
            onPress={() => console.log('Button pressed')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  // Add your styles here
  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    padding: 15,
    
  },
  header: {
    marginBottom: 20,
    marginTop: 20,
  },
  headerText: {
    textAlign: 'center',
  },
  content: {
    alignContent: 'center',
  },
  checkboxContainer: {
    marginTop: 20,
  },
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginTop: 20,
  },
  Text: {
    textAlign: 'justify',
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});

export default About;
