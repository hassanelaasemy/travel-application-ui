import { View, Image, Text ,StyleSheet } from 'react-native';
import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';
const InfoCard = ({ icon, text, style }) => {
  return (
    <View style={styles.container}>
     <View style={styles.icon}>
     <Ionicons name={icon} size={20} color={COLORS.second} style={{top:8}} />
     </View>
      <Text style={[styles.title, style]}>{text}</Text>
    </View>
  );
};

export default InfoCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  icon: {
    width: 40,
    height: 40,
    alignItems:"center",
  },
  title: {
    fontSize: 12,
    color: "#000",
  },
});
