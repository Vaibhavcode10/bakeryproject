import React, { useState, useEffect } from 'react';
import { useProducts } from './Productprovider';

export default function ProductPastery() {
  const { selectedPastries, addToCart, total, setTotal, email } = useProducts();
  const [pastries, setPastries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    console.log("Fetching pastries...");
    fetch("https://yashmore-e5q6islzdq-uc.a.run.app/pastery")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        if (data.success && Array.isArray(data.items)) {
          setPastries(data.items);
        } else {
          console.error("Unexpected API response format:", data);
          setError(new Error("Invalid data format"));
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching pastries:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const [pastryQuantities, setPastryQuantities] = useState({});

  useEffect(() => {
    if (pastries.length > 0) {
      const initialQuantities = pastries.reduce((acc, pastry) => ({ ...acc, [pastry.name]: 1 }), {});
      setPastryQuantities(initialQuantities);
    }
  }, [pastries]);

  const handleQuantityChange = (pastryName, newQuantity) => {
    setPastryQuantities((prev) => ({
      ...prev,
      [pastryName]: newQuantity > 0 ? newQuantity : 1,
    }));
  };

  const handleAddToCart = (pastryName, price) => {
    const quantity = pastryQuantities[pastryName];
    const pastryObj = { name: pastryName, price, quantity };
    addToCart(pastryObj, 'pastry');
    setTotal((prevTotal) => prevTotal + price * quantity);
    setPastryQuantities((prev) => ({
      ...prev,
      [pastryName]: 1,
    }));
  };

  const handleSubmitCart = async () => {
    if (!email) {
      setSubmissionStatus('Please provide an email address');
      return;
    }

    if (selectedPastries.length === 0) {
      setSubmissionStatus('Cart is empty');
      return;
    }

    const cartData = {
      email: email,
      items: selectedPastries,
      total: total
    };

    try {
      setSubmissionStatus('Submitting...');
      const response = await fetch('https://yashmore-e5q6islzdq-uc.a.run.app/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setSubmissionStatus('Cart submitted successfully!');
      alert("Order recorded"); // Added alert message here
      // Optionally reset cart after successful submission
      // addToCart([], 'pastry');
      // setTotal(0);
    } catch (error) {
      console.error('Error submitting cart:', error);
      setSubmissionStatus(`Error submitting cart: ${error.message}`);
    }
  };

  console.log("Rendering pastries:", pastries);

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#FFF8E1', marginTop: '5rem' }}>
      <h2 className="text-center mb-5" style={{ color: '#838080FF', fontSize: '2rem', fontWeight: '700', fontFamily: 'cursive' }}>
        Our Delicious Pastries
      </h2>

      {loading && <div className="text-center py-5">Loading...</div>}
      {error && <div className="text-center py-5">Error: {error.message}</div>}

      {!loading && !error && (
        <div className="container-fluid">
          <div className="row g-4">
            {pastries.map((pastry, index) => (
              <div className="col-12 col-md-6 col-lg-4" key={index}>
                <div className="card h-100 shadow" style={{ backgroundColor: '#fffcf5', borderRadius: '15px', transition: 'transform 0.3s ease' }}>
                  <div className="position-relative">
                    <img src={pastry.image} className="card-img-top" alt={pastry.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge rounded-pill" style={{ backgroundColor: '#FFA000', padding: '0.5rem 0.75rem', fontSize: '1rem' }}>
                        ${pastry.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title" style={{ color: '#F57C00', fontSize: '1.5rem', fontWeight: '600' }}>{pastry.name}</h5>
                    <p className="card-text" style={{ color: '#666', fontSize: '1rem' }}>{pastry.description}</p>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <div className="quantity-selector d-flex align-items-center W" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '0.4rem', border: '1px solid #FFB300' }}>
                        <button className="btn px-2" style={{ color: '#FFA000', fontWeight: 'bold' }} onClick={() => handleQuantityChange(pastry.name, pastryQuantities[pastry.name] - 1)}>
                          -
                        </button>
                        <span className="mx-2" style={{ fontSize: '1.1rem', fontWeight: '500', color: '#333' }}>{pastryQuantities[pastry.name]}</span>
                        <button className="btn px-2" style={{ color: '#FFA000', fontWeight: 'bold' }} onClick={() => handleQuantityChange(pastry.name, pastryQuantities[pastry.name] + 1)}>
                          +
                        </button>
                      </div>
                      <button className="btn ms-2" style={{ backgroundColor: '#FFA000', color: 'white', borderRadius: '8px', padding: '0.6rem 1rem' }} onClick={() => handleAddToCart(pastry.name, pastry.price)}>
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
              <div className="card shadow" style={{ backgroundColor: '#fffcf5', borderRadius: '15px' }}>
                <div className="card-header text-center py-3" style={{ backgroundColor: '#FFA000', color: 'white', fontSize: '1.5rem', fontWeight: '600' }}>
                  Your Pastry Selection
                </div>
                <div className="card-body p-4">
                  {selectedPastries.length > 0 ? (
                    <>
                      <div className="table-responsive">
                        <table className="table table-borderless">
                          <thead>
                            <tr style={{ borderBottom: '2px solid #eee' }}>
                              <th style={{ color: '#F57C00' }}>Pastry</th>
                              <th style={{ color: '#F57C00' }}>Quantity</th>
                              <th style={{ color: '#F57C00', textAlign: 'right' }}>Price</th>
                              <th style={{ color: '#F57C00', textAlign: 'right' }}>Subtotal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedPastries.map((item, index) => (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.quantity}</td>
                                <td style={{ textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                                <td style={{ textAlign: 'right' }}>${(item.price * item.quantity).toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="text-end mt-3">
                        <h4 style={{ color: '#F57C00' }}>Total: ${total.toFixed(2)}</h4>
                        <button 
                          className="btn mt-3" 
                          style={{ backgroundColor: '#FFA000', color: 'white', borderRadius: '8px', padding: '0.6rem 1rem' }}
                          onClick={handleSubmitCart}
                        >
                          Submit Order
                        </button>
                      </div>
                      {submissionStatus && (
                        <p className="text-center mt-3" style={{ color: submissionStatus.includes('Error') ? '#FF0000' : '#008000' }}>
                          {submissionStatus}
                        </p>
                      )}
                    </>
                  ) : (
                    <p className="text-center" style={{ color: '#F57C00' }}>No items in cart</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}