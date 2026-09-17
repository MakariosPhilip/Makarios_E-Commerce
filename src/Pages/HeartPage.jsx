import AllHeaders from "../Components/AllHeaders";
import Product from "../Components/Product";
import { userHeart } from "../store/index2";

export default function HeartPage() {
  const { productsHeart } = userHeart();

  return (
    <div>
      <AllHeaders />
      <div className="mt-70 md:mt-50 m-5 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-5 ">
        {productsHeart.map((el) => (
          <Product
            title={el.title}
            price={el.price}
            img={el.img}
            rate={el.rate}
            id={el.id}
          />
        ))}
      </div>
      {(!productsHeart || productsHeart.length === 0) && (
        <p className="p-5 text-black/50 text-2xl">your favourits is empty.</p>
      )}
    </div>
  );
}
