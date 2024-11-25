import { router } from "expo-router";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

const AuthenticatedScreen = ({ user, handleAuthentication }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [carLocation, setCarLocation] = useState<any>(null);
  const [locationFetched, setLocationFetched] = useState(false);
  const [carDetails, setCarDetails] = useState({ name: "", model: "" });

  const fetchLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCarLocation(location.coords);
      setLocationFetched(true);
    } catch (err) {
      alert("Error fetching location");
    }
  };

  useEffect(() => {
    if (locationFetched) return;
    fetchLocation();
  }, [locationFetched]);

  const handleInputChange = (key: string, value: string) => {
    setCarDetails((prev) => ({ ...prev, [key]: value }));
  };

  const isCarDetailsComplete = carDetails.name && carDetails.model;

  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>
        Welcome, <Text style={styles.emailText}>{user.email}</Text>
      </Text>

      {!locationFetched ? (
        <>
          <TextInput
            placeholder="Car Name"
            style={styles.input}
            value={carDetails.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <TextInput
            placeholder="Car Model"
            style={styles.input}
            value={carDetails.model}
            onChangeText={(text) => handleInputChange("model", text)}
          />
          <Button
            title="Get Location"
            onPress={fetchLocation}
            color="#27ae60"
          />
        </>
      ) : (
        <>
          {isEditing ? (
            <>
              <TextInput
                placeholder="Car Name"
                style={styles.input}
                value={carDetails.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
              <TextInput
                placeholder="Car Model"
                style={styles.input}
                value={carDetails.model}
                onChangeText={(text) => handleInputChange("model", text)}
              />
              <Button
                title="Save Changes"
                onPress={() => setIsEditing(false)}
                color="#27ae60"
              />
            </>
          ) : (
            <>
              <Text style={styles.info}>
                Car Name: <Text>{carDetails.name}</Text>
              </Text>
              <Text style={styles.info}>
                Car Model: <Text>{carDetails.model}</Text>
              </Text>
              <Text style={styles.info}>
                Current Location:{" "}
                <Text>
                  Lat: {carLocation?.latitude}, Lon: {carLocation?.longitude}
                </Text>
              </Text>
            </>
          )}
        </>
      )}

      <View style={styles.buttonGroup}>
        {!isEditing && (
          <Button
            title="Edit Car Details"
            onPress={() => setIsEditing(true)}
            color="#3498db"
          />
        )}
        <Button
          color="#e7ae3c"
          title="Look at Friend List"
          onPress={() => router.push("./friends")}
          disabled={!locationFetched || !isCarDetailsComplete}
        />
        <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  authContainer: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
  },
  emailText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 8,
    marginVertical: 8,
    fontSize: 16,
    color: "#000000",
  },
  info: {
    fontSize: 16,
    marginVertical: 4,
    color: "#000000",
  },
  buttonGroup: {
    marginTop: 16,
  },
});

export default AuthenticatedScreen;
