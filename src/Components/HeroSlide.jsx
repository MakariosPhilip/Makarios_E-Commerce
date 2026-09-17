import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import img1 from "../img/banner_Hero1.jpg"
import img2 from "../img/banner_Hero2.jpg"
import img3 from "../img/banner_Hero3.jpg"

export default function HeroSlide() {
  return (
    <div className='mt-70 md:mt-45'>
      <Swiper  autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true} 
        pagination={true} 
        modules={[Autoplay,Pagination]} 
        className="container m-6 text-black ">
        <SwiperSlide>
          <div className="absolute top-1/2 -translate-y-1/2 left-[5%]">
            <p className='mb-2 text-[1.5vw]'><i>introducing the new</i></p>
            <h1 className='text-[3vw] leading-[1] mb-10 font-bold text-[var(--main-color)]'>micrsoft xbox <br/> 360 controller</h1>
            <p className='text-black/50 text-[1.1vw]'>windows xp/10/7/8 Ps3, tv box</p>
            <button className='p-2 mt-6 w-30 rounded-3xl bg-[var(--main-color)] text-white cursor-pointer transition duration-300 hover:scale-110'>Shop Now</button>
          </div>
          <img className='w-full' src={img1}/>
        </SwiperSlide>
        <SwiperSlide>
         <div className="absolute top-1/2 -translate-y-1/2 left-[5%]">
            <p className='mb-2 text-[1.5vw]'><i>introducing the new</i></p>
            <h1 className='text-[3vw] leading-[1] mb-10 font-bold text-[var(--main-color)]'>micrsoft xbox <br/> 360 controller</h1>
            <p className='text-black/50 text-[1.1vw]'>windows xp/10/7/8 Ps3, tv box</p>
            <button className='p-2 mt-6 w-30 rounded-3xl bg-[var(--main-color)] text-white cursor-pointer transition duration-300 hover:scale-110'>Shop Now</button>
          </div>
          <img className='w-full' src={img2}/>
        </SwiperSlide>
        <SwiperSlide>
          <div className="absolute top-1/2 -translate-y-1/2 left-[5%]">
            <p className='mb-2 text-[1.5vw]'><i>introducing the new</i></p>
            <h1 className='text-[3vw] leading-[1] mb-10 font-bold text-[var(--main-color)]'>micrsoft xbox <br/> 360 controller</h1>
            <p className='text-black/50 text-[1.1vw]'>windows xp/10/7/8 Ps3, tv box</p>
            <button className='p-2 mt-6 w-30 rounded-3xl bg-[var(--main-color)] text-white cursor-pointer transition duration-300 hover:scale-110'>Shop Now</button>
          </div>
          <img className='w-full' src={img3}/>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
