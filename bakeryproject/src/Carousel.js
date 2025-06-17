import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import bakeryImage from "./Allimages/bakeryimage.jpg"; // Import ima
import bakeryImage3 from "./Allimages/bakeryimage3.jpg"; // Import image
import bakeryImage4 from "./Allimages/bakeryimage4.jpg"; // Import image
import bakeryimage5 from "./Allimages/bakeryimage5.jpg"; // Import image
// product images
import cookie from "./Allimages/cookie.jpg";
import cake from "./Allimages/Cake.jpg";
import pastry from "./Allimages/pastry.jpg";
import sweetbun from "./Allimages/sweetbun.jpg";
import donuts from "./Allimages/donuts.jpg";
import gulab_jamun from "./Allimages/gulab_jamun.jpg";
import image from "./Allimages/image.jpg";
import st from "./Allimages/st.png";
import "./Allproduct.css";
import strawberry from "./Allimages/strawberry.jpg";
import popular from "./Allimages/popular.jpg";
import choclate from "./Allimages/choclate.jpg";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);


  // Images array
  const images = [bakeryimage5, bakeryImage4, bakeryImage, bakeryImage3];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const stopSlideshow = () => {
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const startSlideshow = () => {
    setIsPlaying(true);
    intervalRef.current = setInterval(nextSlide, 5000);
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(nextSlide, 7000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying]);

  const products = [
    {
      id: 1,
      title: "Cookies",
      description: "MO'S Bakery PROBIOTIC ORANGE COOKIES",
      image: cookie
    },
    {
      id: 2,
      title: "Cakes",
      description: "MO'S Bakery MUESLI BERRY NUT CRUNCH",
      image: cake
    },
    {
      id: 3,
      title: "pastry",
      description: "MO'S Bakery QUINOA PUFFS NACHO FLAVOUR",
      image: pastry
    }
  ];

  const products2 = [
    {
      id: 4,
      title: "sweetbun",
      description: "MO'S Bakery RAGI CHIPS PERI PERI FLAVOUR",
      image: sweetbun
    },
    {
      id: 5,
      title: "donuts",
      description: "MO'S Bakery PROBIOTIC CARAMEL COOKIES",
      image: donuts
    },
    {
      id: 6,
      title: "gulab jamun",
      description: "MO'S Bakery SNACK BARS",
      image: gulab_jamun
    }
  ];

  const cakes = [
    {
      image: strawberry,
      title: "Strawberry Bliss",
      description:
        "A melody of soft sponge and luscious strawberries, a kiss of cream on a dreamy delight."
    },
    {
      image: choclate,
      title: "Chocolate Symphony",
      description:
        "Dark as the midnight sky, rich as love’s first embrace—this cake sings in cocoa whispers."
    }
  ];
  const naviagte = useNavigate();
  const handleNavigation = () => {
    naviagte("/contact-us"); // Update path if different
  };

  return (
    <>
      {/* Carousel Section */}
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        {/* Image Fullscreen */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover", // Ensures image covers the entire area
            position: "absolute"
          }}
        />

        {/* Manual Controls */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            gap: "20px"
          }}
        ></div>
      </div>

      {/* All Products Section */}
      <div
        className="container-fluid border mb-5"
        style={{ backgroundColor: "#F1FBFEFF", height: "90em" }}
      >
        <div
          className="container mt-5 mb-5 d-flex flex-column"
          style={{ height: "100vh" }}
        >
          {/* Row 1 */}
          <div className="row w-100 flex-grow-1 " style={{ height: "auto" }}>
            {products.map((product) => (
              <div
                key={product.id}
                className="col-md-4 mb-4 d-flex align-items-stretch"
              >
                <div
                  className="product-card p-3 border rounded shadow mt-2 d-flex flex-column"
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#EAD9E9FF"
                  }}
                >
                  {/* Image with Hover Effect */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image w-100 mb-2 flex-grow-1"
                  />
                  <h2 className="h5 text-center mt-4">{product.title}</h2>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="row w-100 flex-grow-1" style={{ height: "100%" }}>
            {products2.map((product) => (
              <div
                key={product.id}
                className="col-md-4 mb-4 d-flex align-items-stretch"
              >
                <div
                  className="product-card p-3 border rounded shadow mt-2 d-flex flex-column"
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#EAD9E9FF"
                  }}
                >
                  {/* Image with Hover Effect */}
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image w-100 mb-2 flex-grow-1"
                  />
                  <h2 className="h5 text-center mt-4">{product.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* porcess image */}
      <div className="mb-5 " style={{ backgroundColor: "white" }}>
        <div className="container bg-light">
          <div className="col-md-12 w-100">
            <img src={image} className="" />
          </div>
        </div>
      </div>
      {/* Popular Picks Section */}
      <div className="container d-flex justify-content-center mb-5 p-0">
        <div className="row w-100">
          {/* Text Section */}
          <div
            className="col-md-4 border m-0 p-5 d-flex flex-column justify-content-center"
            style={{ backgroundColor: "#F8E6F8" }}
          >
            <div className="ms-3 mt-5">
              <h4
                className="fw-lighter align-self-start"
                style={{ fontWeight: "lighter", fontFamily: "fantasy" }}
              >
                Popular Picks
              </h4>
              <p
                className="mt-2 px-1 text-start"
                style={{
                  fontWeight: "lighter",
                  color: "gray",
                  fontFamily: "fantasy"
                }}
              >
                Tap on the Products in the Image to Learn More
              </p>
              <button
                className="btn btn-primary w-50 mt-3 zoom-btn"
                style={{ backgroundColor: "#170404FF", border: "none" }}
              >
                Shop Now
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-md-8 border m-0 p-0">
            <img
              src={popular}
              className="w-100"
              style={{ maxHeight: "500px", objectFit: "cover" }}
              alt="Popular Picks"
            />
          </div>
        </div>
      </div>

      {/* Blogs section */}
      <div>
        <h4 className="text-center mt-3 mb-3">Blogs</h4>
      </div>
      <div className="container my-5 d-flex w-100">
        <h2 className="text-center mb-4">Cake Delights</h2>
        <div className="row" >
          {cakes.map((cake, index) => (
            <div key={index} className="col-md-6 mb-4"  >
              <div className="card border-0 shadow-sm" style={{backgroundColor:"#F8E6F8"}}>
                <img
                  src={cake.image}
                  className="card-img-top zoom-btn"
                  alt={cake.title}
                  style={{ maxHeight: "300px", objectFit: "cover" }}
                />

                <div className="card-body">
                  <h5 className="card-title">{cake.title}</h5>
                  <p className="card-text text-muted">{cake.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* footer */}
      <div>
        <footer className="footer bg-dark text-white mt-5">
          {/* Subscription Section */}
          <div className="subscribe-section text-center p-5">
            <h2
              className="fw-semibold"
              style={{
                marginTop: "4rem",
                marginBottom: "1.5rem",
                fontFamily: "serif"
              }}
            >
              Subscribe to Our Emails
            </h2>
            <p
              className="mb-4"
              style={{ color: "#7D7D7DFF", fontFamily: "cursive" }}
            >
              Be the first to know about new collections and exclusive offers.
            </p>
            <div className="d-flex justify-content-center mb-5">
              <input
                type="email"
                placeholder="Email"
                className="form-control w-50 me-3 zoom-btn"
                style={{
                  backgroundColor: "white",
                  outline: "none",
                  border: "none",
                  padding: "0.75rem",
                  borderRadius: "5px"
                }}
                onFocus={(e) => (e.target.style.outline = "none")}
              />

              <button
                className="btn btn-dark zoom-btn ms-3"
                style={{
                  border: "1px solid #fff",
                  borderRadius: "5px",
                  padding: "0.5rem 1.50rem",
                  height: "3rem"
                }}
              >
                →
              </button>
            </div>
          </div>

          {/* Footer Content */}
          <div className="container-fluid py-5">
            <div className="row g-4 justify-content-center">
              {/* Reach Us */}
              <div className="col-md-4 d-flex flex-column h-100 ms-2">
                {/* make this secttin clikable if cliked it shpuld naviagte to vcontact page i have set teh roiyting just update path */}
                <h5
                  className="fw-bold mb-3"
                  style={{
                    color: "#fff",
                    fontSize: "1.25rem",
                    cursor: "pointer"
                  }}
                  onClick={handleNavigation}
                >
                  Reach Us
                </h5>

                <p
                  className="mb-2"
                  style={{ color: "#d3d3d3", fontSize: "0.95rem" }}
                >
                  +91 11 3580 0968
                </p>
                <p
                  className="mb-2"
                  style={{ color: "#d3d3d3", fontSize: "0.95rem" }}
                >
                  Mo's Bakery Private Ltd
                </p>
                <p
                  className="mb-3"
                  style={{ color: "#d3d3d3", fontSize: "0.95rem" }}
                >
                  8, Ground Floor, DSIDC SHED SCHEME-1 OKHLA <br /> INDUSTRIAL
                  AREA PH-2, New Delhi 110020
                </p>
                <div className="social-icons mt-auto">
                  <a
                    href="#"
                    className="text-white me-3"
                    style={{ fontSize: "1.5rem", textDecoration: "none" }}
                  >
                    ⚪
                  </a>
                  <a
                    href="#"
                    className="text-white"
                    style={{ fontSize: "1.5rem", textDecoration: "none" }}
                  >
                    ⚪
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-md-3 d-flex flex-column h-100">
                <h5
                  className="fw-bold mb-3"
                  style={{ color: "#fff", fontSize: "1.25rem" }}
                >
                  Quick Links
                </h5>
                <ul className="list-unstyled flex-grow-1">
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-white text-decoration-none"
                      style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                    >
                      Track Your Order
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-white text-decoration-none"
                      style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-white text-decoration-none"
                      style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                    >
                      Refund & Cancellation
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-white text-decoration-none"
                      style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                    >
                      Terms & Conditions
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-white text-decoration-none"
                      style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Shop */}
              <div className="col-md-3 d-flex flex-column h-100">
                <h5
                  className="fw-bold mb-3"
                  style={{ color: "#fff", fontSize: "1.25rem" }}
                >
                  Shop
                </h5>
                <ul className="list-unstyled flex-grow-1">
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-white text-decoration-none"
                      style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                    >
                      Cookies
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-white text-decoration-none"
                      style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                    >
                      Muesli
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-white text-decoration-none"
                      style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                    >
                      Granola Bars
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-white text-decoration-none"
                      style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                    >
                      Seed Mixes
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-white text-decoration-none"
                      style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                    >
                      Gift Boxes
                    </a>
                  </li>
                  <li className="mb-2">
                    <a
                      href="#"
                      className="text-white text-decoration-none"
                      style={{ fontSize: "0.95rem", transition: "color 0.3s" }}
                    >
                      Super Savers
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div
            className="text-center py-4 border-top"
            style={{ color: "#d3d3d3", fontSize: "0.9rem" }}
          >
            © 2025, Mo's Bakery
          </div>
        </footer>
      </div>
    </>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  color: "white",
  border: "none",
  borderRadius: "4px"
};
