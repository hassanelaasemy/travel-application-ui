import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import jsonData from "../data/attractions.json";
import categories from "../data/categories.json";
import Categories from "../components/Categories";
import AttractionCard from "../components/AttractionCard";
const ALL = "All";
const Home = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(jsonData);
  }, []);
  useEffect(() => {
    if (selectedCategory === ALL) {
      setData(jsonData);
    } else {
      const filteredData = jsonData?.filter((item) =>
        item?.categories?.includes(selectedCategory)
      );
      setData(filteredData);
    }
  }, [selectedCategory]);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        style={{ flexGrow: 1 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found.</Text>
        }
        ListHeaderComponent={
          <>
            <View style={{ margin: 32 }}>
              <Text style={[styles.title, { fontWeight: "normal" }]}>
                Where do
              </Text>
              <Text style={styles.title}>you want to go?</Text>
              <Text style={[styles.subtitle]}>Explore Attractions</Text>
            </View>
            <Categories
              selectedCategory={selectedCategory}
              onCategoryPress={setSelectedCategory}
              categories={[ALL, ...categories]}
            />
          </>
        }
        keyExtractor={(item) => String(item?.id)}
        renderItem={({ item, index }) => (
          <AttractionCard
            key={item.id}
            style={
              index % 2 === 0
                ? { marginRight: 12, marginLeft: 32 }
                : { marginRight: 32 }
            }
            title={item.name}
            subtitle={item.city}
            imageSrc={item.images?.length ? item.images[0] : null}
            onpress={() => navigation.navigate("DeatialsScreen", { item })}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    fontSize: 20,
    color: "#000000",
    marginTop: 40,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 12,
    color: "rgba(0,0,0,0.5)",
  },
  title: {
    fontSize: 32,
    color: "#4681A3",
    fontWeight: "bold",
  },
});
