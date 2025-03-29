import React from 'react';
import Header from '../src/Componets/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../src/Pages/Food';
import ProductReview from '../src/Pages/ProductReview';
import SinglePost from '../src/Pages/SinglePost';
import CarDetails from './Pages/CarDetails';
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/product' element={<ProductReview />} />
        <Route path='/food/:slug' element={<SinglePost />} />
        <Route path="/CarDetails/:slug" element={<CarDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
