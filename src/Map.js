/* global kakao */
import React, { useRef, useEffect, useState } from "react";
import metro from "./metro.json";
import code from "./서울시 지하철역 정보 검색 (역명).json";
import SetDestination from "./SearchBar";
import SearchBar from "./SearchBar";
import axios from "axios";
let today = new Date();

let year = today.getFullYear(); // 년도
let month = ("0" + (today.getMonth() + 1)).slice(-2);
let date = ("0" + today.getDate()).slice(-2);
let hours = ("0" + today.getHours()).slice(-2);
let minutes = ("0" + today.getMinutes()).slice(-2);
let seconds = ("0" + today.getSeconds()).slice(-2);

const Map = () => {
  const [searchValue, setSearchValue] = useState("");
  const [destination, setDestination] = useState("");
  const [route, setRoute] = useState([]);
  const handleInputClear = () => {
    setSearchValue("");
  };
  const handleInputChange = (event) => {
    // console.log(event.target.value);
    setSearchValue(event.target.value);
  };
  const handleDestination = () => {
    var station_code = code.DATA;
    var des = "";
    for (var i = 0; i < station_code.length; i++) {
      if (station_code[i]["station_nm"] === searchValue) {
        setDestination(station_code[i]["fr_code"]);
      }
    }
    //console.log(destination);
    return des;
  };
  let list = [];
  //useEffect(() => {}, [handleInputChange]);
  //console.log(searchValue);
  //console.log("도착지 코드", destination);

  useEffect(() => {
    console.log(destination);
    function onGeoOk(position) {
      // console.log(`${position}/////`);
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      //console.log(lat, lon);

      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: 3,
      };

      var map = new kakao.maps.Map(container, options);
      const newArrayData = metro.map((item, index) => {
        var markerPosition = new kakao.maps.LatLng(item.lat, item.lng);
        var marker = new kakao.maps.Marker({
          position: markerPosition,
          clickable: true,
        });
        marker.setMap(map);

        kakao.maps.event.addListener(marker, "click", function () {
          // 마커 위에 인포윈도우를 표시합니다
          infowindow.open(map, marker);
          console.log(item.name);
          var station_code = code.DATA;
          var ccode = "";
          for (var i = 0; i < station_code.length; i++) {
            if (station_code[i]["station_nm"] === item.name) {
              ccode = station_code[i]["fr_code"];
            }
          }
          console.log(destination);
          console.log("출발지 코드", ccode);
          console.log("도착지 코드", destination);
          // var start = item.name;
          // var end = '서울역';
          //console.log(SearchBar.destination);

          const URL = `/v5/api/transit/directions/subway?start=${ccode}&goal=${destination}&departureTime=${year}-${month}-${date}T${hours}%3A${minutes}%3A${seconds}`;
          const sta = "";
          console.log(URL);
          axios.get(URL).then((data) => {
            //console.log(data.data.paths[0].legs);
            //console.log(data.data);
            console.log(data.data.paths[0].legs[0].steps);
            // console.log(data.data.paths[0].legs[0].steps[0].stations.length);
            // console.log(data.data.paths[0].legs[0].steps[1].stations.length);
            // console.log(data.data.paths[0].legs[0].steps[2].stations.length);
            let cnt = 0;
            for (
              var i = 0;
              i < data.data.paths[0].legs[0].steps.length;
              i = i + 2
            ) {
              console.log(data.data.paths[0].legs[0].steps[i].routes[0].name);
              for (
                var j = 0;
                j < data.data.paths[0].legs[0].steps[i].stations.length;
                j++
              ) {
                console.log(
                  data.data.paths[0].legs[0].steps[i].stations[j].name
                );
                list[cnt] =
                  data.data.paths[0].legs[0].steps[i].stations[j].name;
                cnt++;
              }
            }
            console.log(list);
            setRoute(list);
          });
          // window.open(
          //   `https://map.naver.com/v5/subway/1000/${ccode}/${destination}/-?c=14145960.6606329,4521075.1398191,15,0,0,0,dh`
          // );
        });

        var iwContent = `<div style="padding:5px;">${item.name}</div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
          iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

        // 인포윈도우를 생성합니다
        var infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });
      });

      var markerPosition = new kakao.maps.LatLng(lat, lng);
      var marker = new kakao.maps.Marker({
        position: markerPosition,
        clickable: true,
      });

      marker.setMap(map);

      // 마커에 클릭이벤트를 등록합니다
    }
    function onGeoError() {
      alert("can't find you");
    }

    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }, [destination]);

  return (
    <div>
      <div id="map" style={{ width: "700px", height: "600px" }}></div>
      <div id="destination">
        <input
          type="text"
          value={searchValue}
          placeholder="search value"
          onChange={handleInputChange}
        ></input>
        <button onClick={handleDestination}>도착지</button>
        <button onClick={handleInputClear}>clear</button>
        <br />
        '역'을 빼고 검색해주세요!
      </div>
      <div id="station">{route}</div>
    </div>
  );
};

export default Map;
