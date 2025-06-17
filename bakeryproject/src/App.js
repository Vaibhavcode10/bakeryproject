import React from "react";
import Navbar from "./Navbar";
import Carousel from "./Carousel";
import ProductCookies from "./ProductPages/productCookies"; // Ensure correct casing
import ProductDonut from "./ProductPages/ProductDonut";
import Aboutus from './AboutUs';
import Contactus from './Contact';
import { Route, Routes } from "react-router-dom";
import ProductHealthysnack from "./ProductPages/ProductHealthysnack";
import ProductPastery from "./ProductPages/ProductPastery";
import LoginPage from "./LoginPage";

export default function App() {
  return (
    <>
      <Routes>
        {/* Login Page without Navbar */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Routes with Navbar */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/courselhome" element={<Carousel />} />
                <Route path="/home" element={<Carousel />} />
                <Route path="/products/cookies" element={<ProductCookies />} />
                <Route path="/products/pastry" element={<ProductPastery />} />
                <Route path="/products/Healthy-Snacks" element={<ProductHealthysnack />} />
                <Route path="/products/The-Ultimate-Cookie" element={<ProductCookies />} />
                <Route path="/products/donuts" element={<ProductDonut />} />
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/contact-us" element={<Contactus />} />
              </Routes>
              <div style={{ backgroundColor: "white" }}></div>
            </>
          }
        />
      </Routes>
    </>
  );
}