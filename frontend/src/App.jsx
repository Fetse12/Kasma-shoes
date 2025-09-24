// import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/cart";
import Search from "./pages/Search";
import Viewshoe from "./pages/ViewShoe";
import ShoeCategory from "./pages/shoeCatagory";
import Shoe from "./pages/shoe";
import Succsuss from "./pages/succsuss";
import CheckOut from "./pages/checkout";
import TypeShoe from "./pages/TypeShoe";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shoe" element={<Shoe />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="/viewshoe/:id" element={<Viewshoe />} />
        <Route path="/shoeCatagory/:type" element={<ShoeCategory />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/success" element={<Succsuss />} />
        <Route path="/shoeType" element={<TypeShoe />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}
