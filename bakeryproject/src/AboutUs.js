import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutUs = () => {
  const reviews = [
    {
      image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=600",
      text: "The best pastries I've ever tasted! So fresh and delightful!",
      author: "Emma R.",
    },
    {
      image: "https://images.pexels.com/photos/8105039/pexels-photo-8105039.jpeg?auto=compress&cs=tinysrgb&w=600",
      text: "Puffin Bakery’s croissants are heavenly!",
      author: "Liam T.",
    },
    {
      image: "https://images.pexels.com/photos/4686960/pexels-photo-4686960.jpeg?auto=compress&cs=tinysrgb&w=600",
      text: "Absolutely love the variety—10/10 experience!",
      author: "Sophie K.",
    },
  ];

  return (
    <>
      <div
        className="container-fluid"
        style={{
          marginTop: "6rem",
          background: "linear-gradient(135deg, #f9f4f5 0%, #fff0f5 100%)",
          padding: "0 2rem",
          minHeight: "100vh",
        }}
      >
        {/* Header Section */}
        <section
          className="text-center mb-5 pb-5"
          style={{
            borderBottom: "3px solid #e183cd",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "0 0 20px 20px",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
          }}
        >
          <h2
            style={{
              fontSize: "4rem",
              fontFamily: "'Playfair Display', cursive",
              color: "#e183cd",
              textShadow: "2px 2px 5px rgba(225, 131, 205, 0.3)",
              letterSpacing: "1px",
            }}
          >
            About freshly baked Bakery
          </h2>
          <p
            style={{
              fontSize: "1.3rem",
              color: "#6c757d",
              fontFamily: "'Lora', serif",
              fontStyle: "italic",
            }}
          >
            Crafting wholesome, guilt-free treats with passion and care
          </p>
        </section>

        {/* Main Content */}
        <div
          className="row align-items-center mb-5"
          style={{ padding: "2rem 0" }}
        >
          <div className="col-12 col-md-6 order-md-2 mb-4 mb-md-0">
            <img
              src="https://images.pexels.com/photos/6223074/pexels-photo-6223074.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Puffin Bakery"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
              }}
            />
          </div>
          <div className="col-12 col-md-6 order-md-1">
            <div
              style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.85)",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h3
                style={{
                  fontSize: "2.2rem",
                  color: "#dc87da",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Welcome to Puffin Bakery
              </h3>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#5a5a5a",
                  fontFamily: "'Lora', serif",
                  lineHeight: "1.8",
                }}
              >
                At Puffin Bakery, our journey began in a home kitchen in 2020,
                where we started creating petite cookies with unique flavors
                using natural ingredients. Our passion for baking has grown
                into a mission to deliver wholesome treats that bring joy to
                every bite. Whether it’s our signature puff pastries or custom
                orders, we pour love into every creation!
              </p>
            </div>
          </div>
        </div>

        {/* Our Story Section */}
        <div
          className="row align-items-center mb-5"
          style={{ padding: "2rem 0" }}
        >
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <img
              src="https://images.pexels.com/photos/4921526/pexels-photo-4921526.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Puffin Bakery Founder"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
              }}
            />
          </div>
          <div className="col-12 col-md-6">
            <div
              style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.85)",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h4
                style={{
                  fontSize: "2rem",
                  color: "#dc87da",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Our Story
              </h4>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#5a5a5a",
                  fontFamily: "'Lora', serif",
                  lineHeight: "1.8",
                }}
              >
                Puffin Bakery was born from a family recipe passed down through
                generations. In 2020, our founder started baking in her home
                kitchen, perfecting a cookie recipe that’s now famous for its
                size and flavor. Today, we work with local farmers and artisans
                to source the finest ingredients, ensuring every treat is a
                labor of love.
              </p>
            </div>
          </div>
        </div>

        {/* Ingredients and Process */}
        <div
          className="row align-items-center mb-5"
          style={{ padding: "2rem 0" }}
        >
          <div className="col-12 col-md-6 order-md-2 mb-4 mb-md-0">
            <img
              src="https://images.pexels.com/photos/11209147/pexels-photo-11209147.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Fresh Ingredients"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
              }}
            />
          </div>
          <div className="col-12 col-md-6 order-md-1">
            <div
              style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.85)",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h4
                style={{
                  fontSize: "2rem",
                  color: "#dc87da",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                What Makes Us Special
              </h4>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#5a5a5a",
                  fontFamily: "'Lora', serif",
                  lineHeight: "1.8",
                }}
              >
                We pride ourselves on using organic, locally sourced
                ingredients to create the best baked goods. From hand-mixed
                doughs to carefully selected fruits and nuts, every step is
                crafted with care to bring you delicious, guilt-free snacks.
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mb-5" style={{ padding: "3rem 0" }}>
          <h3
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              color: "#dc87da",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: "700",
              marginBottom: "3rem",
              textShadow: "1px 1px 5px rgba(220, 135, 218, 0.2)",
            }}
          >
            What Our Customers Say
          </h3>
          <div className="row g-4">
            {reviews.map((review, index) => (
              <div className="col-12 col-md-4" key={index}>
                <div
                  style={{
                    height: "100%",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
                    background: "#fff",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 30px rgba(0, 0, 0, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(0, 0, 0, 0.1)";
                  }}
                >
                  <img
  src={review.image}
  alt={`Review ${index + 1}`}
  style={{
    width: "100%",
    height: "350px", // Increased height for better visibility
    objectFit: "cover",
    borderBottom: "2px solid #e183cd",
  }}
/>

                  <div style={{ padding: "1.5rem" }}>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#6c757d",
                        fontFamily: "'Lora', serif",
                        fontStyle: "italic",
                        marginBottom: "1rem",
                      }}
                    >
                      "{review.text}"
                    </p>
                    <p
                      style={{
                        fontSize: "1rem",
                        color: "#dc87da",
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: "600",
                        textAlign: "right",
                        marginBottom: "0",
                      }}
                    >
                      - {review.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Vision and Values */}
        <div
          className="row align-items-center mb-5"
          style={{ padding: "2rem 0" }}
        >
          <div className="col-12 col-md-6 mb-4 mb-md-0">
            <img
              src="https://images.pexels.com/photos/6061743/pexels-photo-6061743.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Puffin Bakery Team"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.4s ease, box-shadow 0.4s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
              }}
            />
          </div>
          <div className="col-12 col-md-6">
            <div
              style={{
                padding: "2rem",
                background: "rgba(255, 255, 255, 0.85)",
                borderRadius: "15px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h4
                style={{
                  fontSize: "2rem",
                  color: "#dc87da",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Our Vision
              </h4>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "#5a5a5a",
                  fontFamily: "'Lora', serif",
                  lineHeight: "1.8",
                }}
              >
                Since opening in 2020, the Puffin Bakery team has been dedicated
                to making the best cookies you’ll ever taste. Our goal is to
                provide wholesome, delicious baked goods that inspire joy and
                nourish the community. We’re committed to sustainable practices
                and supporting local suppliers to create treats that do good!
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;