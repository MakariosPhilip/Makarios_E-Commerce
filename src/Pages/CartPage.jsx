import { useState } from "react";
import AllHeaders from "../Components/AllHeaders";
import { userStore } from "../store";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";

export default function CartPage() {
  const { products, removeFromCart, updateQuantity } = userStore();

  const totalPrice = products.reduce(
    (acc, el) => acc + el.price * el.quantity, 0,);

  return (
    <>
      <AllHeaders />
      <div className="text-black flex justify-center h-screen mt-75 md:mt-50 ">
        <div className="border w-[80%] md:w-[60%] lg:w-[45%] h-[95%] p-3 border-black/15 shadow-2xl flex flex-col">
          <h1 className="text-[var(--main-color)] text-3xl font-bold p-4 border-b border-black/15 ">
            order summary
          </h1>
          <div className="overflow-y-scroll border-b h-screen border-black/15">
            {products.length === 0 && (
              <p className="p-5 text-black/50 text-2xl">your cart is empty.</p>
            )}

            {products.map((el) => (
              <div
                key={el.id}
                className="flex justify-between items-center mt-12 pb-4 border-b last:border-b-0 border-black/15"
              >
                <div className="flex gap-10">
                  <img src={el.img} className="w-25" />
                  <div className="flex flex-col gap-2">
                    <h2>{el.title}</h2>
                    <p className="text-black/40 text-xl">
                      ${(el.price * el.quantity).toFixed(2)}
                    </p>

                    <div className="flex">
                      <button
                        onClick={() =>
                          el.quantity > 1 &&
                          updateQuantity(el.id, el.quantity - 1)
                        }
                        className="btn btn-error"
                      >
                        -
                      </button>
                      <p className="bg-[var(--second-color)] transition text-[var(--main-color)] p-2 text-center w-12">
                        {el.quantity}
                      </p>
                      <button
                        onClick={() => updateQuantity(el.id, el.quantity + 1)}
                        className="btn btn-success"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <RiDeleteBin6Line
                  onClick={() => {removeFromCart(el.id) ; toast.error("Removed From Cart")}}
                  className="text-4xl text-red-600 cursor-pointer hover:scale-110 transition"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between ml-4 py-5 text-xl border-b border-black/20">
            Total:
            <span className="font-bold text-[var(--main-color)] text-[22px]">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <button className="bg-[var(--main-color)] p-4 m-4 mt-4 border-2 border-[var(--main-color)] text-white text-xl font-bold cursor-pointer hover:bg-white hover:text-[var(--main-color)] transition duration-300">
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}
