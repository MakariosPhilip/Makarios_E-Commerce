import { useEffect, useState } from "react";
import SlideProduct from "./SlideProduct";
import axios from "axios";

export default function AllSlideProducts() {
  const [category, setCategory] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://dummyjson.com/products/category-list")
  //     .then((res) => {
  //       setCategory(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // return (
  //   <div>
  //     {[...category].reverse().map((el) => (
  //       <SlideProduct key={el} title={el} />
  //     ))}
  //   </div>
  // );

  return(
    <div>
      <SlideProduct title={"vehicle "} />
      <SlideProduct title={"motorcycle "} />
      <SlideProduct title={"laptops"} />
      <SlideProduct title={"mobile-accessories"} />
      <SlideProduct title={"sports-accessories "} />

    </div>
  )
}
