import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

export default function App() {

  return (
    <View style={styles.container}>
      <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          initialRegion={{
            latitude: 42,
            longitude: 40,
            latitudeDelta: 90, // Pretty good swath to see a few countries
            longitudeDelta: 180,
          }}
        ></MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  googleMap: {
    //...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    height: 64, 
    width: 64,
    padding:20,
    margin:10,
    borderRadius: 8,
    },
});
