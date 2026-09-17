import { create } from "zustand";

export const userStore = create((set) => ({
  products: JSON.parse(localStorage.getItem("cart")) || [],
  productsHeart: JSON.parse(localStorage.getItem("Heart")) || [],

  addToCart: (product) =>
    set((state) => {
      const newProducts = [...state.products, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(newProducts));
      return { products: newProducts };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newProducts = state.products.filter((el) => el.id !== id);
      localStorage.setItem("cart", JSON.stringify(newProducts));
      return { products: newProducts };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const newProducts = state.products.map((el) =>
        el.id === id ? { ...el, quantity } : el
      );
      localStorage.setItem("cart", JSON.stringify(newProducts));
      return { products: newProducts };
    }),


    addToCart: (product) =>
    set((state) => {
      const newProducts = [...state.products, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(newProducts));
      return { products: newProducts };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const newProducts = state.products.filter((el) => el.id !== id);
      localStorage.setItem("cart", JSON.stringify(newProducts));
      return { products: newProducts };
    }),

}));
