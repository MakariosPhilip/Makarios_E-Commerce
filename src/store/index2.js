import { create } from "zustand";

export const userHeart = create((set) => ({
  productsHeart: JSON.parse(localStorage.getItem("Heart")) || [],

  addToHeart: (product) =>
    set((state) => {
      const newProducts = [...state.productsHeart, product];
      localStorage.setItem("Heart", JSON.stringify(newProducts));
      return { productsHeart: newProducts };
    }),

  removeFromHeart: (id) =>
    set((state) => {
      const newProducts = state.productsHeart.filter((el) => el.id !== id);
      localStorage.setItem("Heart", JSON.stringify(newProducts));
      return { productsHeart: newProducts };
    }),

}));
