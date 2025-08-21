import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/cart';
import Search from './pages/Search';
import Viewshoe from './pages/ViewShoe';
import ShoeCategory from './pages/shoeCatagory';
import Shoe from './pages/shoe';
import GetShoe from './pages/GetShoe/getShoe';
import Page1 from './pages/GetShoe/page1';
import Page2 from './pages/GetShoe/page2';
import Page3 from './pages/GetShoe/page3';
import Page4 from './pages/GetShoe/page4';
import Succsuss from './pages/succsuss';
import CheckOut from './pages/checkout';
import Customize from './pages/Customize';
import Customized_Order from './pages/Customized_Order';
import TypeShoe from './pages/TypeShoe';

export default function App() {
  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path="/customize" element={<Customize />} />
        <Route path="/getShoe" element={<GetShoe />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shoe" element={<Shoe />} />
        <Route path="/search/:searchTerm" element={<Search />} />
        <Route path="/viewshoe/:id" element={<Viewshoe />} />
        <Route path="/shoeCatagory/:type" element={<ShoeCategory />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/getShoe/page1" element={<Page1 />} />
        <Route path="/getShoe/page2" element={<Page2 />} />
        <Route path="/getShoe/page3" element={<Page3 />} />
        <Route path="/getShoe/page4" element={<Page4 />} />
        <Route path="/getShoe" element={<GetShoe />} />
        <Route path="/success" element={<Succsuss />} />
        <Route path="/customized_sucssus" element={<Customized_Order />} />
        <Route path="/shoeType" element={<TypeShoe />} />
      </Routes>
    </BrowserRouter>
  );
}

