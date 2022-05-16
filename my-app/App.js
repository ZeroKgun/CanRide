import * as React from "react";
//import MapView from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Alert,
  TextInput,
  FlatList,
  Button,
} from "react-native";
import styled from "styled-components";
import { useState, useEffect } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";
import metro from "./metro.json";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import code from "./서울시 지하철역 정보 검색 (역명)";
import axios from "axios";
import haversine from "haversine-distance";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const desc = [];
let today = new Date();

let year = today.getFullYear(); // 년도
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let date = ("0" + today.getDate()).slice(-2);
let hours = ("0" + today.getHours()).slice(-2);
let minutes = ("0" + today.getMinutes()).slice(-2);
let seconds = ("0" + today.getSeconds()).slice(-2);

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#42f5a1", "#42f58a", "#42f54e"]}
        style={styles.background}
      />
      <Text style={styles.text}>탈수이써!</Text>
      <Button title="타러 가자!" onPress={() => navigation.navigate("Map")} />
    </View>
  );
};

const MapScreen = ({ navigation }) => {
  const [initialRegion, setInitialRegion] = useState({
    latitude: 35.91395373474155,
    longitude: 127.73829440215488,
    latitudeDelta: 5,
    longitudeDelta: 5,
  });
  const [mapWidth, setMapWidth] = useState("99%");
  const [location, setLocation] = useState(0);
  const [errorMsg, setErrorMsg] = useState(null);
  const [inputText, setInputText] = useState("");
  const [destination, setDestination] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [route, setRoute] = useState([]);
  const [inputs, setInputs] = useState({
    lat: "",
    lng: "",
  });
  const { lat, lng } = inputs;
  const ccode = {};
  const list = [];

  var array = metro.map(function (item) {
    return {
      latitude: item.lat,
      longitude: item.lng,
    };
  });

  //console.log(array);

  const updateMapStyle = () => {
    setMapWidth("100%");
  };

  const handleDestination = () => {
    console.log(searchValue);
    var station_code = code.DATA;
    var des = "";
    for (var i = 0; i < station_code.length; i++) {
      if (station_code[i]["station_nm"] === inputText) {
        setDestination(station_code[i]["fr_code"]);
      }
    }
    console.log("도착지 코드 : ", destination);
    return des;
  };

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLogitude] = useState(null);

  // Get current location information
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      for (var i = 0; i < array.length; i++) {
        const a = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        const b = {
          latitude: array[i].lat,
          longitude: array[i].lng,
        };
        //console.log(haversine(a, b));
        if (haversine(a, b) <= 2000) {
          ccode.latitude = array[i].lat;
          ccode.longitude = array[i].lng;
          desc.push(ccode);
        }
      }
      // const a = {
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude,
      // };
      // const b = {
      //   latitude: array[0].lat,
      //   longitude: array[0].lng,
      // };
      // console.log(haversine(a, b));
      // console.log("desc1", desc);
      // console.log("location1", location);
      // console.log("ccode1", ccode.latitude);
      // console.log("ccode1", ccode.longitude);
      //console.log("array1", array);
    })();
    // const newArrayData = metro.map((item, index) => {
    //   //console.log(item.lat, item.lng);
    //   setLat(...lat, item.lat);
    //   setLng(...lng, item.lng);
    // });
    // console.log("desc2", desc);
    // console.log("location2", location);
    // console.log("ccode2", ccode.latitude);
    // console.log("ccode2", ccode.longitude);
    //console.log("array2", array);
  }, []);
  // console.log("desc3", desc);
  // console.log("location3", location);
  // console.log("ccode3", ccode.latitude);
  // console.log("ccode3", ccode.longitude);
  //console.log("array3", array);
  //console.log(inputs);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    console.log("[LOG] current location : " + text);
    console.log(inputText);
  }
  // console.log("desc4", desc);
  // console.log("location4", location);
  // console.log("ccode4", ccode.latitude);
  // console.log("ccode4", ccode.longitude);
  //console.log("array4", array);

  return (
    <Wrapper>
      {/* <Header title='지도' /> */}
      <TextInput
        style={styles.textInput}
        placeholder="Where are you going?"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button
        onPress={handleDestination}
        title="도착지 설정"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <MapView
        initialRegion={initialRegion}
        style={[styles.map, { width: mapWidth }]}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onMapReady={() => {
          updateMapStyle();
        }}
      >
        {/* <Marker
          coordinate={{
            latitude: desc[1].latitude,
            longitude: desc[1].longitude,
          }}
          title="this is a marker"
          description="this is a marker example"
        /> */}
        {metro.map((marker, index) => {
          //console.log("marker", marker);
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.lat ? marker.lat : 0,
                longitude: marker.lng ? marker.lng : 0,
                //latitude: marker.lat,
                //longitude: marker.lng,
              }}
              onPress={() => {
                navigation.navigate("Details");
              }}
            ></Marker>
          );
        })}
      </MapView>
    </Wrapper>
  );
};

const DetailsScreen = ({ navigation }) => {
  return (
    <Wrapper>
      <View>
        <Text>
          여기에 이제 경로랑 택시 아이콘이랑 택시비를 알려주는 레전드를
          보여줄꺼임
        </Text>
      </View>
    </Wrapper>
  );
};

function app() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default app;

const Wrapper = styled.View`
  flex: 1;
  flex-direction: column;
`;
const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  TextInput: {
    fontSize: 20,
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: "#e7e7e7",
    padding: 7,
    borderRadius: 10,
    marginRight: 15,
  },
  locationText: {},
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
    backgroundColor: "black",
  },
  container: {
    margin: 20,
  },
  textInput: {
    fontSize: 20,
    paddingTop: 50,
  },
});