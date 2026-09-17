import axios from "axios";
import Product from "./Product";
import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import Loader from "./Loader";

export default function SlideProduct({title}) {

  const[Products,SetProducts]=useState([]);
  const [loading, SetLoading] = useState(true);

  useEffect(()=>{
    axios.get(`https://dummyjson.com/products/category/${title}`)
    .then((res)=>{
      SetProducts(res.data.products)
      SetLoading(false);
    })
    .catch((err)=>{
     console.log(err)
     SetLoading(false);
    } 
  )
},[title])

  if (loading) return (<Loader/>);
  
  return (
    <div className="m-8">
      <div className="container m-auto my-35">
        <h1 className="text-[var(--main-color)] text-3xl font-bold mb-3">{title}</h1>
        <p className="text-black/60 mb-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, nesciunt?</p>
        <div className=" h-[1px] bg-black/20 w-full mb-5">
          <p className=" h-[2px]  bg-[var(--main-color)] w-[8%]"></p>
        </div>
      <div className="hidden md:flex ">
        <Swiper autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          }} loop={true} slidesPerView={title == "tablets" ? 3: title== "skin-care" ? 3 : title == "womens-jewellery" ? 3 : 4} navigation={true} modules={[Autoplay,Navigation]}>
          {
            Products.map((el)=>(
            <SwiperSlide key={el.id}>{<Product title={el.title} price={el.price} img={el.images[0]} rate={el.rating} id={el.id}/>}</SwiperSlide>
           ))
          }
          </Swiper>
      </div>    
      <div className="md:hidden">
        <Swiper autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          }} loop={true} slidesPerView={2} navigation={true} modules={[Autoplay,Navigation]}>
          {
            Products.map((el)=>(
            <SwiperSlide key={el.id}>{<Product title={el.title} price={el.price} img={el.images[0]} rate={el.rating} id={el.id}/>}</SwiperSlide>
           ))
          }
          </Swiper>
      </div>
      </div>  
    </div>
  );
}
