import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { FaShare } from "react-icons/fa6";
import Loader from "../Components/Loader";
import { FaShoppingCart } from "react-icons/fa";
import SlideProduct from "../Components/SlideProduct";
import AllHeaders from "../Components/AllHeaders";
import { userStore } from "../store";
import { userHeart } from "../store/index2";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();

  const [Product, SetProduct] = useState(null);
  const [loading, SetLoading] = useState(true);
  const [indexOFImage, setIndexOFImage] = useState(0);

  const { products , addToCart } = userStore();
  const {productsHeart, addToHeart , removeFromHeart } = userHeart();

  const isProductInCart = products?.some((el) => (el.id === parseInt(id)));

  const isProductInHeart = productsHeart?.some((el) => (el.id === parseInt(id)));


  const handleAddToCart = () => {
    if (!isProductInCart && Product) {
      addToCart({
        title: Product.title,
        price: Product.price,
        img: Product.thumbnail,
        rate: Product.rating,
        id: Product.id
      });
      toast.success('Added To Cart')
    }
  }

  const handleAddToHeart = (id) => {
    if (!isProductInHeart) {
      addToHeart({
        title: Product.title,
        price: Product.price,
        img: Product.thumbnail,
        rate: Product.rating,
        id: Product.id
      });
      toast.success('Added To Favourits')
    }
    else{
      removeFromHeart(id);
      toast.error("Removed To Favourits")
    }
  }


  useEffect(() => {
    SetProduct(null);
    SetLoading(true);
    setIndexOFImage(0);

    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        SetProduct(res.data);
        SetLoading(false);
      })
      .catch((err) => {
        console.log(err);
        SetLoading(false);
      });
  }, [id]);
  
  if (loading) return (<Loader/>);

    
  let image = Product.images;

  let changeImage = (i) => {
    setIndexOFImage(i);
  };


  return (
    <>
      <AllHeaders/>

      <div className="flex flex-col md:flex-row justify-center items-center gap-50 relative max-md:text-center m-10 mt-50">
        <div>
         <img src={image[indexOFImage]} className="w-[300px] md:w-[450px] mt-20" />
         <div className="w-[150px] hidden lg:flex items-center gap-10 cursor-pointer mt-10">
           {image.map((el,i)=>( i<3 && <img className="hover:scale-150 transition duration-500" onClick={() => changeImage(i)} key={i} src={el}/>))}
         </div>
        </div>
        <div className="text-black">
          <h1 className="text-[var(--main-color)] text-3xl font-bold mb-6">{Product.title}</h1>
          <div className="flex max-md:justify-center text-yellow-300 text-2xl text-c">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaRegStarHalfStroke />
          </div>
          <p className="mt-4 mb-4 text-2xl text-black/50">$ {Product.price}</p>
          <p className="mb-4">Availability: <span className="text-[var(--main-color)]">{Product.availabilityStatus}</span></p>
          <p className="mb-4">Brand: <span className="text-[var(--main-color)]">{Product.brand}</span></p>
          <h2 className="md:w-[20vw] text-black/50 mb-6">{Product.description}</h2>
          <p className="text-[var(--main-color)] text-2xl">Hurry Up! Only {Product.stock} products left in stock.</p>
          {isProductInCart ? (
            <button className={`btn border-2 border-[var(--main-color)] text-[var(--main-color)] w-40 h-13 text-[17px] mt-4 mb-4 bg-white cursor-not-allowed`}>Item In Cart <FaShoppingCart className="text-[20px]"/></button>
          ) : (
            <button onClick={handleAddToCart} className={`btn bg-[var(--main-color)] border-none w-40 h-13 text-[17px] mt-4 hover:scale-110 mb-4 transition-all duration-500 text-white`}>Add To Cart <FaShoppingCart className="text-[20px]"/></button>
          )}
          <div className=" flex max-md:justify-center gap-3 transition-all duration-500 cursor-pointer">
            <div onClick={()=>handleAddToHeart(Product.id)} className={`p-3 rounded-3xl transition duration-300 ${isProductInHeart ? 'bg-[var(--main-color)] text-white' : 'bg-[var(--second-color)] text-[var(--main-color)]'}`}><FaRegHeart/></div>
            <div className="bg-[var(--second-color)] text-[var(--main-color)] p-3 rounded-3xl hover:bg-[var(--main-color)] transition-all duration-500"><FaShare className="hover:text-white transition-all duration-500"/></div>
          </div>    
        </div>
      </div>
      <SlideProduct title={Product.category}/>
    </>
  );
}
