import { StyleSheet } from "react-native";
import Home from "./screens/Home";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DeatailsScreen from "./screens/DeatailsScreen";
import GalleryScreen from "./screens/GalleryScreen";
import { useFonts } from "expo-font";
import Map from "./screens/Map";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();
export default function App() {
  const [fontloaded] = useFonts({
    InterBold: require("./assets/font/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/font/Inter-Light.ttf"),
    InterMedium: require("./assets/font/Inter-Medium.ttf"),
    InterRegular: require("./assets/font/Inter-Regular.ttf"),
    InterLight: require("./assets/font/Inter-SemiBold.ttf"),
  });
  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "#ffffff",
    },
  };
  if (!fontloaded) return null;
  return (
    <>
      <StatusBar style="auto" animated={true} />
      <NavigationContainer theme={appTheme}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="DeatialsScreen" component={DeatailsScreen} />
          <Stack.Screen name="Gallery" component={GalleryScreen} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
