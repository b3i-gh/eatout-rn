import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  Alert,
  ScrollView,
} from "react-native";
import { saveData, loadData } from "./storage.js";

export default function App() {
  const [restaurants, setRestaurants] = useState([
    [], // 0 MC
    [], // 1 BK
    [], // 2 PAK
    [], // 3 KFC
    [], // 4 RH
    [], // 5 GM
    [], // 6 CHINA
    [], // 7 LEP
    [], // 8 LIDO
  ]);

  // Load data on app start
  useEffect(() => {
    async function fetchData() {
      const savedRestaurants = await loadData();
      setRestaurants(savedRestaurants);
    }
    fetchData();
  }, []);

  useEffect(() => {
    saveData(restaurants);
  }, [restaurants]);

  const visitRestaurant = (i) => {
    let currDates = [...restaurants[i], new Date().toLocaleDateString()];
    setRestaurants((prevState) => {
      const newState = [...prevState];
      newState[i] = currDates;
      return newState;
    });
  };

  const handleReset = () => {
    Alert.alert("Reset Data", "Are you sure you want to reset the data?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "OK",
        onPress: () => {
          setRestaurants([[], [], [], [], [], [], [], [], []]);
        },
      },
    ]);
  };

  const getImageSource = (restaurantKey) => {
    switch (restaurantKey.toLowerCase()) {
      case "mc":
        return require("./assets/images/bg_mc.png");
      case "bk":
        return require("./assets/images/bg_bk.png");
      case "pak":
        return require("./assets/images/bg_pak.png");
      case "kfc":
        return require("./assets/images/bg_kfc.png");
      case "rh":
        return require("./assets/images/bg_rh.png");
      case "gm":
        return require("./assets/images/bg_gm.png");
      case "china":
        return require("./assets/images/bg_china.png");
      case "lep":
        return require("./assets/images/bg_lep.png");
      case "lido":
        return require("./assets/images/bg_lido.png");
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("./assets/images/bg.jpg")}
        style={styles.containerBG}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleReset();
              }}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            {restaurants.map((_, index) => {
              const restaurantNames = [
                "MC",
                "BK",
                "PAK",
                "KFC",
                "RH",
                "GM",
                "CHINA",
                "LEP",
                "LIDO",
              ];
              const restaurantKey = restaurantNames[index];
              return (
                <TouchableOpacity
                  key={restaurantKey}
                  onPress={() => visitRestaurant(index)}
                  style={styles.card}
                >
                  <ImageBackground
                    source={getImageSource(restaurantKey)}
                    style={styles.toBG}
                  />
                  <Text style={styles.text}>
                    {restaurants[index].length > 0
                      ? `${restaurantKey} ${restaurants[index].length}`
                      : `${restaurantKey}`}
                    {restaurants[index].length > 0
                      ? ` (${
                          restaurants[index][restaurants[index].length - 1]
                        })`
                      : ""}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#000" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 35,
  },
  containerBG: { flex: 1, resizeMode: "contain" },
  scrollView: { flex: 1, width: "100%", paddingTop: 35 },
  card: {
    width: 280,
    height: 110,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: "rgba(255, 255, 255, 1)",
    margin: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  text: {
    position: "relative",
    top: "-60%",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.70)",
  },
  toBG: { width: "100%", height: "100%", opacity: 0.5 },
  topBar: { flexDirection: "row", justifyContent: "center", padding: 5 },
  button: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    marginLeft: 10,
    borderRadius: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
