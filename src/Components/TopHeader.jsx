import logo from "../img/logo.png";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingBasket } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "../store";
import { userHeart } from "../store/index2";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function TopHeader() {

  const { products } = userStore();
  const { productsHeart } = userHeart();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const searchRef = useRef(null);

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/search/${encodeURIComponent(query)}` : "/search");
    setIsOpen(false);
  };

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    const delayDebounce = setTimeout(() => {
      axios
        .get(`https://dummyjson.com/products/search?q=${searchTerm}`)
        .then((res) => {
          setSearchResults(res.data.products || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }, [300]);
    console.log(searchResults);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full text-black py-3">
      <div className="container m-auto flex flex-col md:flex-row justify-between items-center gap-5 ">
        <Link to="/">
          <img src={logo} className="w-[200px] cursor-pointer" alt="Logo" />
        </Link>
        <form ref={searchRef} onSubmit={handleSearch} className="flex items-center relative z-50">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => {
              if (searchResults.length > 0 || searchTerm.trim()) setIsOpen(true);
            }}
            placeholder="search for products"
            className="input rounded-3xl bg-[#F3F3F3] border-[var(--main-color)] w-[350px] md:w-[440px] h-[45px] p-5 placeholder:capitalize"
          />
          <button type="submit" aria-label="Search products" className="absolute right-0 w-[50px] flex items-center justify-center h-full text-white bg-[var(--main-color)] text-2xl rounded-r-3xl cursor-pointer">
            <IoSearchSharp/>
          </button>

          {isOpen && (
            <div className="absolute top-[50px] left-0 w-full bg-white rounded-2xl shadow-xl border border-gray-200 max-h-[320px] overflow-y-auto z-50">
              {loading ? (
                <div className="p-4 text-center text-gray-500 text-sm">Searching...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    onClick={() => {
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-md bg-gray-50"
                    />
                    <div className="flex flex-col flex-1">
                      <span className="font-semibold text-sm text-gray-800 line-clamp-1">
                        {product.title}
                      </span>
                      <span className="text-xs text-[var(--main-color)] font-bold">
                        ${product.price}
                      </span>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500 text-sm">No products found</div>
              )}
            </div>
          )}
        </form>
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
