import React from 'react';
import Header from '../src/Componets/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/Pages/Food';
import ProductReview from '../src/Pages/ProductReview';
import SinglePost from '../src/Pages/SinglePost';
import CarDetails from './Pages/CarDetails';
import CreamDetails from "./Pages/CreamDetails"
import Cream from './Pages/Cream';
import Footer from "./Componets/Footer"
import Scroll from "./Componets/Sroll"
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Scroll/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<ProductReview />} />
        <Route path='/food/:slug' element={<SinglePost />} />
        <Route path="/CarDetails/:slug" element={<CarDetails />} />
        <Route path="/Cream" element={<Cream/>} />
        <Route path="/CreamDetails/:slug" element={<CreamDetails/>} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
