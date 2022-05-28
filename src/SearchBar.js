import React, { useEffect, useState } from "react";
import metro from "./metro.json";
import code from "./서울시 지하철역 정보 검색 (역명).json";
const SearchBar = () => {
  // console.log(global);
  var [searchValue, setSearchValue] = useState("");
  var [destination, SetDestination] = useState("");
  const handleInputChange = (event) => {
    // console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  const shouldDisplayButton = searchValue.length > 0;

  const handleInputClear = () => {
    setSearchValue("");
  };

  const handleDestination = () => {
    var station_code = code.DATA;
    for (var i = 0; i < station_code.length; i++) {
      if (station_code[i]["station_nm"] === searchValue) {
        SetDestination(station_code[i]["fr_code"]);
      }
    }
    //SetDestination(destination);
    console.log(destination);
  };
  // products.map((product) => {
  //   console.log(product);
  // });

  // const filteredProducts = products.filter((product) => {
  //   return product.includes(searchValue);
  // });

  return (
    <div className="searchBar">
      <input
        type="text"
        value={searchValue}
        placeholder="search value"
        onChange={handleInputChange}
      />
      {shouldDisplayButton && (
        <button onClick={handleDestination}>도착지</button>
      )}
      <button onClick={handleInputClear}>clear</button>
      {/* <ul>
        {filteredProducts.map((product) => {
          return <li key={product}>{product}</li>;
        })}
      </ul> */}
    </div>
  );
};

export default SearchBar;
