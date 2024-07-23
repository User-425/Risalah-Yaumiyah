import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Colors, Typography, Card, Switch, ListItem } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Header from '../../components/Header';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [isDarkModeEnabled, setDarkModeEnabled] = React.useState(false);

  return (
    <View style={styles.container}>
      <View>
        <Header title="Pengaturan" />
      </View>
      <ScrollView>
        <Card style={styles.card}>
          <View style={styles.item}>
            <Icon name="notifications" size={24} color={Colors.blue30} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Notifikasi</Text>
              <Text style={styles.itemDescription}>Aktifkan notifikasi</Text>
            </View>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={value => setNotificationsEnabled(value)}
            />
          </View>

          <View style={styles.item}>
            <Icon name="brightness-6" size={24} color={Colors.blue30} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Mode Gelap</Text>
              <Text style={styles.itemDescription}>Aktifkan mode gelap</Text>
            </View>
            <Switch
              value={isDarkModeEnabled}
              onValueChange={value => setDarkModeEnabled(value)}
            />
          </View>

          <TouchableOpacity style={styles.item}>
            <Icon name="help-outline" size={24} color={Colors.blue30} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Bantuan</Text>
              <Text style={styles.itemDescription}>Bantuan dan dukungan</Text>
            </View>
            <Icon name="chevron-right" size={24} color={Colors.grey40} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Icon name="info-outline" size={24} color={Colors.blue30} />
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Tentang</Text>
              <Text style={styles.itemDescription}>Informasi aplikasi</Text>
            </View>
            <Icon name="chevron-right" size={24} color={Colors.grey40} />
          </TouchableOpacity>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  headerTitle: {
    ...Typography.text40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.black,
  },
  card: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.grey80,

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.grey60,
  },
  itemContent: {
    flex: 1,
    marginLeft: 10,
  },
  itemTitle: {
    ...Typography.text60,
    fontWeight: '500',
    color: Colors.black,
  },
  itemDescription: {
    ...Typography.text80,
    color: Colors.grey40,
  },
});

export default SettingsScreen;
