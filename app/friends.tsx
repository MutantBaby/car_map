import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { calculateDistance, mockData } from "@/utils";

export default function Friends() {
  const [userLocation, setUserLocation] = useState<any>(null);
  const [selectedDistance, setSelectedDistance] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords as any);
    })();
  }, []);

  const handlePersonClick = (person: any) => {
    if (userLocation) {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        person.lat,
        person.lon
      );
      setSelectedDistance({ name: person.name, distance });
    } else {
      alert("User location not available");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Friend to Measure Distance</Text>
      <FlatList
        data={mockData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handlePersonClick(item)}>
            <Text style={styles.listText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      {selectedDistance && (
        <View style={styles.result}>
          <Text style={styles.resultText}>
            Distance to {selectedDistance.name}:{" "}
            {selectedDistance.distance.toFixed(2)} km
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  listItem: {
    padding: 15,
    backgroundColor: "#ddd",
    marginVertical: 5,
    borderRadius: 5,
  },
  listText: { fontSize: 16 },
  result: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#92f5dc",
    borderRadius: 10,
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
