import { IoMenuSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { BsPersonPlusFill } from "react-icons/bs";
import { FaArrowDown } from "react-icons/fa";
import { ImMenu3 } from "react-icons/im";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

  export default function BottomHeader() {

  const [Categories,getCategories]=useState([]);
  
  useEffect(()=>{
    axios.get('https://dummyjson.com/products/categories')
    .then((res)=>{getCategories(res.data)})
    .catch((err)=>{console.log(err)})}
    ,[])

  const [IfOpenList,SetIfOpenList]=useState(false)
  
  const OpenList=()=>{
    SetIfOpenList(!IfOpenList)
  }

  const [IfOpenMenu,SetIfOpenMenu]=useState(false)
  
  const OpenMenu=()=>{
    SetIfOpenMenu(!IfOpenMenu)
  }

  return (
    <div className="bg-[var(--main-color)]">
      <div className="flex container m-auto justify-center md:justify-between  items-center">
        <div className="flex items-center text-[20px] justify-between gap-15">
          <div onClick={OpenList} className={` flex items-center gap-4 cursor-pointer relative z-10`}>
            <IoMenuSharp className="text-2xl "/>
            <p className="font-bold">browser category</p>
            <FaArrowDown className="text-[15px]" />
            <div className={`${IfOpenList?'h-[400px] opacity-100 ':'h-0 opacity-0' } text-black w-full absolute top-[40px] over  overflow-y-scroll flex flex-col border border-black/30 transition-all duration-700 `}>
             {
               Categories.map((el)=>((<Link to={`/category/${el.slug}`} className="bg-white border-b last:border-b-0 border-black/20 p-2 text-[15px] hover:bg-gray-100"key={el.slug}>{el.name}</Link>)))
              }
            </div>
          </div>

          <div onClick={OpenMenu} className="md:hidden relative cursor-pointer"><ImMenu3 className="text-4xl"/>
            <div className= {`${IfOpenMenu?'h-[400px] opacity-100 ':'h-0 opacity-0' } text-black absolute top-[40px] h-fit flex flex-col border border-black/30 transition-all duration-700 -left-5 z-10`} >
              <div className="flex flex-col w-[100px] text-center bg-white"> 
                <Link to="/" className="border-b last:border-b-0 border-black/20 p-2 text-[15px]">home</Link>
                <Link to="/about" className="border-b last:border-b-0 border-black/20 p-2 text-[15px] ">about</Link>
                <Link to="/accessories" className="border-b last:border-b-0 border-black/20 p-2 text-[15px] ">accessories</Link>
                <Link to="/blog" className="border-b last:border-b-0 border-black/20 p-2 text-[15px] ">blog</Link>
                <Link to="/contact" className="border-b last:border-b-0 border-black/20 p-2 text-[15px]">contact</Link>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex gap-6 m-auto justify-between items-center">
            <Link to="/" className="hover:bg-[#0079cA] p-3 transition duration-500">home</Link>
            <Link to="/about" className="hover:bg-[#0079cA] p-3 transition duration-500">about</Link>
            <Link to="/accessories" className="hover:bg-[#0079cA] p-3 transition duration-500">accessories</Link>
            <Link to="/blog" className="hover:bg-[#0079cA] p-3 transition duration-500">blog</Link>
            <Link to="/contact" className="hover:bg-[#0079cA] p-3 transition duration-500">contact</Link>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-5">
          <IoMdExit className="text-2xl cursor-pointer"/>
          <BsPersonPlusFill className="text-2xl cursor-pointer"/>
        </div>
      </div>
    </div>
  );
}
