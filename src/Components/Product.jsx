// import img from "../img/1.webp";
import { FaCheck, FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { userStore } from "../store";
import toast, { Toaster } from "react-hot-toast";
import { userHeart } from "../store/index2";


export default function Product({title,price,img,rate,id}) {

  const { products , addToCart } = userStore();

  const { productsHeart , addToHeart , removeFromHeart} = userHeart();

  let starsRate=Math.round(rate);

  const isProductInCart = products?.some((el) => (el.id === id));

  const handleAddToCart = () => {
    if (!isProductInCart) {
      addToCart({title,price,img,rate,id});
      toast.success('Added To Cart')
    }
  }

  const isProductInHeart = productsHeart?.some((el) => (el.id === id));

  const handleAddToHeart = (id) => {
    if (!isProductInHeart) {
      addToHeart({title,price,img,rate,id});
      toast.success('Added To Favourits')
      
    }
    else{
      removeFromHeart(id);
      toast.error("Removed To Favourits")
      
    }
  }

  return (
    <div className="group flex flex-col p-6 w-[92%] md:w-[97%] cursor-pointer border-black/10 hover:shadow-2xl hover:border-[var(--main-color)] border-2 transition-all duration-300 relative overflow-hidden h-[380px]">
      <Link to={`/products/${id}`}>
        <p className={`text-black flex gap-3 w-[90px] items-center absolute transition-all duration-300 ${!isProductInCart ? "-top-5" : "top-2" } right-1/2 translate-x-1/2`}><FaCheck className="text-green-400"/> in cart </p>
        <img src={img} className="w-[200px] mb-6 group-hover:scale-140 transition-all duration-300"/>
        <p className="text-black mb-2 group-hover:scale-80 transition-all duration-300">{title}</p>
        <div className="flex mb-2 gap-1  text-yellow-300 text-xl group-hover:scale-80 transition-all duration-300">
          <FaStar/>
          <FaStar/>
          <FaStar/>
          <FaStar/>
          <FaRegStarHalfStroke/>
        </div>
        <p className="text-2xl font-bold text-[var(--main-color)] group-hover:scale-80 transition-all duration-300">$ {price}</p>
      </Link>
      <div className="text-[var(--main-color)] flex flex-col gap-3 absolute top-1/2 -translate-y-1/2 -right-15 group-hover:right-5  transition-all duration-500">
        <div onClick={handleAddToCart} className={`p-3 rounded-3xl transition-all duration-300 ${isProductInCart ? 'bg-[var(--main-color)] cursor-not-allowed text-white' : 'bg-[var(--second-color)]'}`}><FaShoppingCart/></div>
        <div onClick={()=>handleAddToHeart(id)} className={`p-3 rounded-3xl transition-all duration-300 ${isProductInHeart ? 'bg-[var(--main-color)] text-white' : 'bg-[var(--second-color)]'}`}><FaRegHeart/></div>
        <div className="bg-[var(--second-color)] p-3 rounded-3xl"><FaShare/></div>
      </div>
    </div>
  );
}
