import React, { useState } from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components";
import metro from "./metro.json";

//google map
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
var array = metro;
//console.log(array);


//console.log(location);


const app = ({ navigation }) => {



  const [initialRegion, setInitialRegion] = useState({
    latitude: 35.91395373474155,
    longitude: 127.73829440215488,
    latitudeDelta: 5,
    longitudeDelta: 5,
  })
  const [mapWidth, setMapWidth] = useState('99%');

  // Update map style to force a re-render to make sure the geolocation button appears
  const updateMapStyle = () => {
    setMapWidth('100%')
  }

  return (
    <Wrapper>
      <MapView
        initialRegion={initialRegion}
        style={[styles.map, { width: mapWidth }]}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => {
          updateMapStyle()
        }}
      >
        { }
        <Marker
          coordinate={
            { latitude: array[0].lat, longitude: array[0].lng }}
          title="this is a marker"
          description="this is a marker example"
        />
        <Marker
          coordinate={
            { latitude: array[1].lat, longitude: array[1].lng }}
          title="this is a marker"
          description="this is a marker example"
        />
        <Marker
          coordinate={
            { latitude: array[2].lat, longitude: array[2].lng }}
          title="this is a marker"
          description="this is a marker example"
        />
      </MapView>
    </Wrapper>
  );
};

export default app;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;
const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});