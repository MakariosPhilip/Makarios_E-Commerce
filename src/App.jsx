import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductDetails from "./Pages/ProductDetails";
import ShowProducts from "./Pages/ShowProducts";
import CartPage from "./Pages/CartPage";
import { Toaster } from "react-hot-toast";
import HeartPage from "./Pages/HeartPage";

export default function App() {
  return (
    <div className="bg-white min-h-screen capitalize">
      <div>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/products/:id" element={<ProductDetails />}></Route>
          <Route path="/category/:id" element={<ShowProducts />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/heart" element={<HeartPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
