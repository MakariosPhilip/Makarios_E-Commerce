import logo from "../img/logo.png";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingBasket } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { userStore } from "../store";
import { userHeart } from "../store/index2";

export default function   TopHeader() {

  const {products} = userStore();
  const {productsHeart} = userHeart();

  return (
    <div className="w-full text-black py-3">
      <div className="container m-auto flex flex-col md:flex-row justify-between items-center gap-5 ">
        <img src={logo} className="w-[200px] cursor-pointer" />
        <div className="flex items-center relative ">
          <input
            type="search"
            placeholder="search for products"
            className="input rounded-3xl bg-[#F3F3F3] border-[var(--main-color)] w-[350px] md:w-[440px] h-[45px] p-5 placeholder:capitalize"
          />
          <button className="absolute right-0 w-[50px] flex items-center justify-center h-full text-white bg-[var(--main-color)] text-2xl rounded-r-3xl cursor-pointer">
            <IoSearchSharp/>
          </button>
        </div>
        <div className="flex text-3xl gap-6">
          <Link className="relative" to="/heart">
            <FaRegHeart className="cursor-pointer" />            
            {productsHeart.length > 0 && <div className="text-[12px] text-white p-2 rounded-full bg-[var(--main-color)] absolute right-1 -top-4">{productsHeart.length}</div>}
          </Link>
          <Link className="relative" to="/cart">
            <div><LuShoppingBasket/></div>
            {products.length > 0 && <div className="text-[12px] text-white p-2 rounded-full bg-[var(--main-color)] absolute right-1 -top-4">{products.length}</div>}
          </Link>
        </div>
      </div>
    </div>
  );
}
