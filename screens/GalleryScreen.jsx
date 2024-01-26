import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
const GalleryScreen = ({ navigation, route }) => {
  const { images } = route?.params || {};
  const onBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 24, marginBottom: 24 }}
          data={images}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
        />

        <TouchableOpacity onPress={onBack} style={styles.backContainer}>
          <Entypo
            name="chevron-left"
            size={35}
            color={COLORS.second}
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: 400,
    borderRadius: 20,
    marginTop: 24,
  },
  backContainer: {
    position: "absolute",
    margin: 32,
  },
  backIcon: {
    width: 40,
    height: 40,
  },
});
