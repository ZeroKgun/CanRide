import metro from "./metro.json";

function Word() {
  const word = metro.map((item, index) => {
    return item.code;
  });
  //console.log(word);
  return <div></div>;
}

export default Word;
