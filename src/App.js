import { useEffect, useState } from "react";
import "./App.css";
import Button from "./Button";
import SearchBar from "./SearchBar";
import Map from "./Map";
import metro from "./metro.json";
import Word from "./Word";
import Login from "./Login";

function App() {
  const [show, setshow] = useState(false);
  const onClick = () => {
    setshow(!show);
    console.log(show);
  };
  let subject = "My React";
  // const searchItems = [
  //   "desktop",
  //   "notebook",
  //   "smart phone",
  //   "clock",
  //   "chair",
  //   "iPad"
  // ]

  const [searchItems, setSearchItems] = useState([]);

  useEffect(() => {
    // console.log("useEffect in App.js called");
    // console.log(
    //   fetch("https://fakestoreapi.com/products")
    //     .then((res) => res.json())
    //     .then((productArray) => {
    //       //console.log(productArray);
    //       const searchItems = productArray.map((product) => {
    //         return product.title;
    //       });
    //       setSearchItems(searchItems);
    //     })
    // );
    const word = metro.map((item, index) => {
      return item.code;
    });
    setSearchItems(word);
  }, []);
  // useEffect(() => {
  //   fetch(metro)
  //     .then((res) => res.json())
  //     .then((production) => {
  //       const Item = production.map((pro) => {
  //         return pro.name;
  //       });
  //       console.log(Item);
  //     });
  // }, []);
  return (
    <div>
      {/* <button onClick={onClick}>{show ? "hide" : "show"}</button>
      {show ? (
        <ul>
          <li>리</li>
          <li>스</li>
          <li>트</li>
        </ul>
      ) : (
        ""
      )} */}
      <Map />
      {/* {subject}
      {searchItems.length > 0 ? <SearchBar /> : "Loading.."} */}
    </div>
  );
}

export default App;
