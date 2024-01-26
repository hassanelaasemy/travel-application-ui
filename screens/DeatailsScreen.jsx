import { Text } from "react-native";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Pressable,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ImageBackground } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { View } from "react-native";
import InfoCard from "../components/InfoCard";
import { COLORS } from "../constants/theme";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { Share } from "react-native";
const { height } = Dimensions.get("window");
const DeatailsScreen = ({ route, navigation }) => {
  const { item } = route?.params || {};
  const mainImage = item?.images?.length ? item?.images[0] : null;
  const slicedImages = item?.images?.length ? item?.images?.slice(0, 5) : [];
  const diffImages = item?.images?.length - slicedImages?.length;
  const onBack = () => {
    navigation.goBack();
  };
  const onGalleryNavigate = () => {
    navigation.navigate("Gallery", { images: item?.images });
  };

  const openingHours = `OPEN
  ${item?.opening_time} - ${item?.closing_time}`;
  const coords = {
    latitude: item?.coordinates?.lat,
    longitude: item?.coordinates?.lon,
    longitudeDelta: 0.009,
    latitudeDelta: 0.009,
  };
  const imageWithoutParams = mainImage?.split("?")[0];
  const imageParts = imageWithoutParams?.split(".");
  const imageExtension = imageParts[imageParts?.length - 1];

  const url =
    "https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_IN&gl=US";
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: item?.name,
        message:
          "Hey, I wanted to share with you this amazing attraction" +
          "\n" +
          url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={styles.mainImage}
          imageStyle={{ borderRadius: 20 }}
          source={{ uri: mainImage }}
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack} hitSlop={8}>
              <Entypo
                name="chevron-left"
                size={35}
                color={COLORS.second}
                style={styles.icon}
              />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={8} onPress={onShare}>
              <Entypo
                name="share"
                size={31}
                color={COLORS.second}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          <Pressable onPress={onGalleryNavigate} style={styles.footer}>
            {slicedImages?.map((image, index) => (
              <View key={image}>
                <Image source={{ uri: image }} style={styles.miniImage} />
                {diffImages > 0 && index === slicedImages?.length - 1 ? (
                  <View style={styles.moreImagesContainer}>
                    <Text style={styles.moreImages}>{`+${diffImages}`}</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </Pressable>
        </ImageBackground>
        <View style={styles.headerContainer}>
          <View style={{ maxWidth: "70%" }}>
            <Text style={styles.title}>{item?.name}</Text>
            <Text style={styles.city}>{item?.city}</Text>
          </View>
          <Text style={styles.title}>{item?.entry_price}</Text>
        </View>

        <InfoCard text={item?.address} icon={"location"} />
        <InfoCard text={openingHours} icon={"time"} />
        <MapView style={styles.map} initialRegion={coords}>
          <Marker coordinate={coords} title={item?.name} />
        </MapView>
        <Text
          style={styles.mapText}
          onPress={() => navigation.navigate("Map", { item })}
        >
          Show full screen map
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeatailsScreen;

const styles = StyleSheet.create({
  container: {
    margin: 32,
  },
  mainImage: {
    width: "100%",
    height: height / 2,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 5,
    width: 36,
    height: 36,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "rgba(256, 256, 256, 0.35)",
    margin: 16,
    paddingHorizontal: 8,
  },
  miniImage: {
    width: 40,
    height: 40,
    marginHorizontal: 4,
    marginVertical: 8,
    borderRadius: 10,
  },
  moreImages: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  moreImagesContainer: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.38)",
    width: 40,
    height: 40,
    top: 8,
    left: 4,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 40,
  },
  title: {
    color: "#000",
    fontSize: 20,
  },
  city: {
    fontSize: 19,
    color: "#000",
    fontWeight: "400",
    marginTop: 8,
    color: COLORS.second,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  mapText: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.second,
    textAlign: "center",
    padding: 16,
    marginBottom: 60,
  },
});
