import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
import { StyleSheet ,Dimensions } from 'react-native';
const { width } = Dimensions.get('window');
const Map = ({ navigation, route }) => {
    const { item } = route?.params || {};
    const coords = {
        latitude: item?.coordinates?.lat,
        longitude: item?.coordinates?.lon,
        longitudeDelta: 0.009,
        latitudeDelta: 0.009,
    };

    const onBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <MapView style={styles.map} initialRegion={coords}>
                <Marker coordinate={coords} title={item?.name} />
            </MapView>

            <View style={styles.header}>
                <TouchableOpacity onPress={onBack}>
                <Entypo
                name="chevron-left"
                size={35}
                color={COLORS.second}
                style={styles.icon}
              />
                </TouchableOpacity>
                <Text style={styles.title}>{`${item?.name}, ${item?.city}`}</Text>
            </View>
        </View>
    );
};

export default React.memo(Map);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    header: {
        position: 'absolute',
        top: 40,
        backgroundColor: 'white',
        borderRadius: 15,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 48,
        padding: 16,
        margin: 24,
    },
    title: {
        fontSize: 20,
        color: '#000',
    },
    back: {
        width: 50,
        height: 50,
        marginRight: 16,
    }
});