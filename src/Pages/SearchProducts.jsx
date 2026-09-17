import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import AllHeaders from "../Components/AllHeaders";
import Loader from "../Components/Loader";
import Product from "../Components/Product";

export default function SearchProducts() {
  const { query } = useParams();
  const searchQuery = query ? decodeURIComponent(query) : "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = searchQuery
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(searchQuery)}&limit=0`
      : "https://dummyjson.com/products?limit=0";

    axios
      .get(endpoint)
      .then((res) => setProducts(res.data.products || []))
      .catch((error) => {
        console.error(error);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [searchQuery]);

  return (
    <>
      <AllHeaders />
      <main className="container m-auto px-4 pt-70 pb-10 md:pt-50">
        <h1 className="text-3xl font-bold text-[var(--main-color)] mb-2">
          {searchQuery ? `Search results for: ${searchQuery}` : "All products"}
        </h1>

        {!loading && (
          <p className="text-black/60 mb-8">
            {products.length} product{products.length === 1 ? "" : "s"} found
          </p>
        )}

        {loading ? (
          <Loader />
        ) : products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Product
                key={product.id}
                title={product.title}
                price={product.price}
                img={product.images?.[0] || product.thumbnail}
                rate={product.rating}
                id={product.id}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-black/60 mt-20">
            No products found.
          </p>
        )}
      </main>
    </>
  );
}