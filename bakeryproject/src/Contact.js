import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    yourAnswer: "", // Changed from "message" to "yourAnswer"
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    console.log("Sending data:", formData); // Debugging log

    try {
      const response = await fetch("https://yashmore-e5q6islzdq-uc.a.run.app/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseBody = await response.text(); // Get response body for debugging
      console.log("Response status:", response.status);
      console.log("Response body:", responseBody);

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", yourAnswer: "" }); // Reset form
      } else {
        setStatus(`Failed to send message: ${responseBody || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <div
      className="container-fluid mt-5"
      style={{
        background: "#fff5f7",
        padding: "3rem",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle Decorative Elements */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          width: "120px",
          height: "120px",
          background: "radial-gradient(circle, rgba(244, 194, 194, 0.3), transparent)",
          borderRadius: "50%",
          zIndex: "0",
          opacity: "0.5",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "30px",
          right: "30px",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, rgba(173, 216, 230, 0.3), transparent)",
          borderRadius: "50%",
          zIndex: "0",
          opacity: "0.4",
        }}
      />

      <div className="row">
        <div
          className="col-12 text-center mb-5"
          style={{ position: "relative", zIndex: "1" }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              fontFamily: "'Dancing Script', cursive",
              color: "#f4c2c2",
              textShadow: "1px 1px 5px rgba(244, 194, 194, 0.3)",
              letterSpacing: "1px",
              transition: "transform 0.5s ease, color 0.5s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.03)";
              e.target.style.color = "#E48B8BFF";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.color = "#EDA9A9FF";
            }}
          >
            Contact freshly baked Bakery
          </h1>
          <p
            style={{
              fontSize: "1.4rem",
              fontFamily: "'Lora', serif",
              color: "#666",
              fontStyle: "italic",
              marginTop: "0.5rem",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "1")}
            onMouseLeave={(e) => (e.target.style.opacity = "0.85")}
          >
            Drop us a sweet note!
          </p>
        </div>
      </div>

      <div className="row justify-content-center">
        <div
          className="col-12 col-md-8 col-lg-6"
          style={{
            background: "rgba(255, 255, 255, 0.95)",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(244, 194, 194, 0.2)",
            padding: "2.5rem",
            border: "2px dashed #add8e6",
            position: "relative",
            zIndex: "1",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-5px)";
            e.currentTarget.style.boxShadow = "0 6px 25px rgba(244, 194, 194, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(244, 194, 194, 0.2)";
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="form-label"
                style={{
                  fontSize: "1.2rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "500",
                  color: "#add8e6",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#87ceeb")}
                onMouseLeave={(e) => (e.target.style.color = "#add8e6")}
              >
                Your Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  fontSize: "1.1rem",
                  fontFamily: "'Lora', serif",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #f4c2c2",
                  background: "#fffafa",
                  color: "#555",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(244, 194, 194, 0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#ff9999";
                  e.target.style.boxShadow = "0 4px 12px rgba(244, 194, 194, 0.3)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#f4c2c2";
                  e.target.style.boxShadow = "0 2px 8px rgba(244, 194, 194, 0.1)";
                  e.target.style.transform = "translateY(0)";
                }}
              />
            </div>

            <div className="mb-4">
              <label
                className="form-label"
                style={{
                  fontSize: "1.2rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "500",
                  color: "#add8e6",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#87ceeb")}
                onMouseLeave={(e) => (e.target.style.color = "#add8e6")}
              >
                Your Email
              </label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  fontSize: "1.1rem",
                  fontFamily: "'Lora', serif",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #f4c2c2",
                  background: "#fffafa",
                  color: "#555",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(244, 194, 194, 0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#ff9999";
                  e.target.style.boxShadow = "0 4px 12px rgba(244, 194, 194, 0.3)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#f4c2c2";
                  e.target.style.boxShadow = "0 2px 8px rgba(244, 194, 194, 0.1)";
                  e.target.style.transform = "translateY(0)";
                }}
              />
            </div>

            <div className="mb-4">
              <label
                className="form-label"
                style={{
                  fontSize: "1.2rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "500",
                  color: "#add8e6",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#87ceeb")}
                onMouseLeave={(e) => (e.target.style.color = "#add8e6")}
              >
                Your Answer
              </label>
              <textarea
                className="form-control"
                name="yourAnswer" // Changed from "message" to "yourAnswer"
                rows="5"
                value={formData.yourAnswer}
                onChange={handleChange}
                required
                style={{
                  fontSize: "1.1rem",
                  fontFamily: "'Lora', serif",
                  padding: "0.75rem",
                  borderRadius: "8px",
                  border: "1px solid #f4c2c2",
                  background: "#fffafa",
                  color: "#555",
                  resize: "vertical",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(244, 194, 194, 0.1)",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#ff9999";
                  e.target.style.boxShadow = "0 4px 12px rgba(244, 194, 194, 0.3)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#f4c2c2";
                  e.target.style.boxShadow = "0 2px 8px rgba(244, 194, 194, 0.1)";
                  e.target.style.transform = "translateY(0)";
                }}
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn"
                style={{
                  background: "#add8e6",
                  color: "#fff",
                  fontSize: "1.2rem",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: "600",
                  borderRadius: "10px",
                  padding: "0.9rem 2.5rem",
                  border: "none",
                  boxShadow: "0 4px 15px rgba(173, 216, 230, 0.4)",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#CF42AEFF";
                  e.target.style.transform = "scale(1.05)";
                  e.target.style.boxShadow = "0 6px 20px rgba(173, 216, 230, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#D773D7FF";
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "0 4px 15px rgba(173, 216, 230, 0.4)";
                }}
              >
                Send Message
              </button>
            </div>
            {status && (
              <div
                className="text-center mt-3"
                style={{ color: status.includes("success") ? "#28a745" : "#dc3545" }}
              >
                {status}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;