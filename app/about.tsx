import React from 'react';
import { StyleSheet, View, ScrollView,  } from 'react-native';
import { Button, Checkbox, Colors, Text } from 'react-native-ui-lib';

import Header from '../components/Header';

const About = () => {
 
  return (
    <View style={styles.container}>
      <View>
        <Header title="About" />
      </View>
      <ScrollView>
      <Text text30 red30>Text goes here</Text>
      <Checkbox value={false} onValueChange={() => console.log('value changed')}/>
      <Button label={'Press'} size={Button.sizes.medium} backgroundColor={Colors.red30}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default About;
