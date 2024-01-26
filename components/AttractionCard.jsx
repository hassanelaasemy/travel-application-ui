import React from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native';
import { COLORS } from "../constants/theme";
const AttractionCard = ({ imageSrc, title, subtitle, style ,onpress}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      activeOpacity={0.8} 
      onPress={onpress}
      style={[styles.card, style]}
    >
      <Image style={styles.image} source={{ uri: imageSrc }} />
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
       
        <Ionicons name='location' size={15} color={COLORS.second} style={styles.icon}/>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AttractionCard);

const styles = StyleSheet.create({
  card: {
    padding: 4,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    borderRadius: 15,
    marginBottom: 12,
  },
  image: {
    width: (width - 96) / 2,
    borderRadius: 15,
    height: 120,
  },
  title: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 12,
    marginLeft: 6,
  },
  subtitle: {
    fontSize: 10,
    fontWeight: "300",
    color: "rgba(0,0,0,0.5)",
  },
  icon: {
    marginRight: 6,
  },
  row: {
    marginBottom: 12,
    marginLeft: 6,
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
  },
});
