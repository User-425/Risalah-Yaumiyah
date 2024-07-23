import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors, Typography} from 'react-native-ui-lib';

const Header: React.FC<{ title: string }> = ({ title }) => {
    return (
        <View style={styles.header}>
            {/* <Icon name="menu" size={0} color={Colors.black} /> */}
            <Text style={styles.headerTitle}>{title}</Text>
            {/* <Icon name="search" size={30} color={Colors.black} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
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
        textAlign: 'center',
      },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Header;
