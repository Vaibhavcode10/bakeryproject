import React, { useState } from 'react';
import { useProducts } from './Productprovider';

export default function ProductCookies() {
  const { selectedCookies, addToCart, total, setTotal } = useProducts();

 const cookies = [
    {
      name: "Chocolate Chip",
      image:
        "https://images.pexels.com/photos/4110541/pexels-photo-4110541.jpeg?auto=compress&cs=tinysrgb&w=600",
      description:
        "Classic chocolate chip cookies with a chewy texture and rich chocolate flavor.",
      price: 2.5
    },
    {
      name: "Oatmeal Raisin",
      image:
        "https://images.pexels.com/photos/8837035/pexels-photo-8837035.jpeg?auto=compress&cs=tinysrgb&w=600",
      description:
        "Hearty oatmeal cookies packed with sweet raisins and a hint of cinnamon.",
      price: 2.75
    },
    {
      name: "Peanut Butter",
      image:
        "https://images.pexels.com/photos/797761/pexels-photo-797761.jpeg?auto=compress&cs=tinysrgb&w=600",
      description:
        "Creamy peanut butter cookies with a crunchy texture and nutty flavor.",
      price: 2.25
    },
    {
      name: "Macadamia Nut",
      image:
        "https://images.pexels.com/photos/1907257/pexels-photo-1907257.jpeg?auto=compress&cs=tinysrgb&w=600",
      description:
        "Delicate macadamia nut cookies with a buttery taste and crunchy nuts.",
      price: 3.0
    },
    {
      name: "Sugar Cookie",
      image:
        "https://images.pexels.com/photos/30900689/pexels-photo-30900689/free-photo-of-golden-cracked-cookies-on-baking-sheet-in-sunlight.jpeg?auto=compress&cs=tinysrgb&w=600",
      description:
        "Simple, sweet sugar cookies with a soft, melt-in-your-mouth texture.",
      price: 2.0
    },
    {
      name: "Double Chocolate",
      image:
        "https://images.pexels.com/photos/5848182/pexels-photo-5848182.jpeg?auto=compress&cs=tinysrgb&w=600",
      description:
        "Rich double chocolate cookies loaded with cocoa and chocolate chips.",
      price: 2.8
    }
  ];
  // Add state to store the quantities for each cookie
  const [cookieQuantities, setCookieQuantities] = useState(
    cookies.reduce((acc, cookie) => ({ ...acc, [cookie.name]: 1 }), {})
  );

  const handleQuantityChange = (cookieName, newQuantity) => {
    setCookieQuantities(prev => ({
      ...prev,
      [cookieName]: newQuantity
    }));
  };

  const handleAddToCart = (cookieName, price) => {
    const quantity = cookieQuantities[cookieName];
    const cookieObj = { name: cookieName, quantity };
    
    // Add to cart using the provider's addToCart function
    // This will handle updating the cart correctly based on the provider implementation
    addToCart(cookieObj);
    
    // Update total price
    setTotal(prevTotal => prevTotal + (price * quantity));
    
    // Reset quantity to 1 after adding to cart
    setCookieQuantities(prev => ({
      ...prev,
      [cookieName]: 1
    }));
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#EACFEC', marginTop: '5rem' }}>
        <h2 className="text-center mb-5" style={{ 
          color: '#663399', 
          fontSize: '2.5rem', 
          fontWeight: '700',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>
          Our Delicious Cookies
        </h2>
      <div className="container-fluid">
      
        
        <div className="row g-4">
          {cookies.map((cookie, index) => (
            <div className="col-12 col-md-6 col-lg-4" key={index}>
              <div 
                className="card h-100 shadow" 
                style={{ 
                  backgroundColor: '#fff0f5', 
                  border: 'none', 
                  borderRadius: '15px', 
                  overflow: 'hidden',
                  transition: 'transform 0.3s ease',
                  transform: 'translateY(0)'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div className="position-relative">
                  <img 
                    src={cookie.image} 
                    className="card-img-top" 
                    alt={cookie.name} 
                    style={{ width: '100%', height: '250px', objectFit: 'cover' }} 
                  />
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge rounded-pill" style={{ backgroundColor: '#ff4d79', padding: '0.5rem 0.75rem', fontSize: '1rem' }}>
                      ${cookie.price.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title" style={{ color: '#663399', fontSize: '1.5rem', fontWeight: '600' }}>{cookie.name}</h5>
                    <p className="card-text" style={{ color: '#666', fontSize: '1rem', marginBottom: '1rem' }}>{cookie.description}</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <div className="quantity-selector d-flex align-items-center" style={{ 
                      backgroundColor: '#fff', 
                      borderRadius: '8px', 
                      padding: '0.4rem', 
                      border: '1px solid #ff4d79' 
                    }}>
                      <button 
                        className="btn px-2" 
                        style={{ color: '#ff4d79', fontWeight: 'bold' }}
                        onClick={() => {
                          if (cookieQuantities[cookie.name] > 1) {
                            handleQuantityChange(cookie.name, cookieQuantities[cookie.name] - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <span className="mx-2" style={{ fontSize: '1.1rem', fontWeight: '500', color: '#333' }}>
                        {cookieQuantities[cookie.name]}
                      </span>
                      <button 
                        className="btn px-2" 
                        style={{ color: '#ff4d79', fontWeight: 'bold' }}
                        onClick={() => handleQuantityChange(cookie.name, cookieQuantities[cookie.name] + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="btn ms-2"
                      style={{ 
                        backgroundColor: '#ff4d79', 
                        color: 'white', 
                        borderRadius: '8px', 
                        padding: '0.6rem 1rem',
                        fontWeight: '500',
                        boxShadow: '0 2px 4px rgba(255, 77, 121, 0.3)',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => handleAddToCart(cookie.name, cookie.price)}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e63c6a'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff4d79'}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary Section */}
        <div className="row mt-5">
          <div className="col-12 col-lg-8 offset-lg-2">
            <div
              className="card shadow"
              style={{
                backgroundColor: "#fff0f5",
                borderRadius: "15px",
                border: "none",
                overflow: "hidden"
              }}
            >
              <div
                className="card-header text-center py-3"
                style={{
                  backgroundColor: "#EF62DAFF",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  border: "none"
                }}
              >
                Your Cookie Selection
              </div>
              <div className="card-body p-4">
                {selectedCookies && selectedCookies.length > 0 ? (
                  <>
                    <div className="table-responsive">
                      <table className="table table-borderless">
                        <thead>
                          <tr style={{ borderBottom: "2px solid #eee" }}>
                            <th style={{ color: "#663399" }}>Cookie</th>
                            <th style={{ color: "#663399" }}>Quantity</th>
                            <th
                              style={{ color: "#663399", textAlign: "right" }}
                            >
                              Price
                            </th>
                            <th
                              style={{ color: "#663399", textAlign: "right" }}
                            >
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedCookies.map((item, index) => {
                            const cookieData = cookies.find(
                              (c) => c.name === item.name
                            );
                            return (
                              <tr
                                key={index}
                                style={{ borderBottom: "1px solid #eee" }}
                              >
                                <td
                                  className="align-middle"
                                  style={{ fontWeight: "500" }}
                                >
                                  {item.name}
                                </td>
                                <td className="align-middle">
                                  {item.quantity}
                                </td>
                                <td className="align-middle text-end">
                                  ${cookieData ? cookieData.price.toFixed(2) : '0.00'}
                                </td>
                                <td className="align-middle text-end">
                                  ${cookieData ? (cookieData.price * item.quantity).toFixed(2) : '0.00'}
                                </td>
                              </tr>
                            );
                          })}
                          <tr>
                            <td
                              colSpan="3"
                              className="text-end"
                              style={{ fontWeight: "600", color: "#663399" }}
                            >
                              Total:
                            </td>
                            <td
                              className="text-end"
                              style={{
                                fontWeight: "700",
                                color: "#ff4d79",
                                fontSize: "1.2rem"
                              }}
                            >
                              ${total.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="text-center mt-3">
                      <button
                        className="btn"
                        style={{
                          backgroundColor: "#663399",
                          color: "white",
                          padding: "0.75rem 2rem",
                          borderRadius: "10px",
                          fontWeight: "500",
                          fontSize: "1.1rem",
                          boxShadow: "0 2px 4px rgba(102, 51, 153, 0.3)",
                          transition: "all 0.2s ease"
                        }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#552b80")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#663399")
                        }
                      >
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <div
                      style={{
                        fontSize: "3rem",
                        color: "#dddddd",
                        marginBottom: "1rem"
                      }}
                    >
                      🍪
                    </div>
                    <p style={{ fontSize: "1.1rem", color: "#888" }}>
                      Your cookie jar is empty!
                    </p>
                    <p style={{ fontSize: "0.9rem", color: "#aaa" }}>
                      Add some delicious cookies to get started.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}