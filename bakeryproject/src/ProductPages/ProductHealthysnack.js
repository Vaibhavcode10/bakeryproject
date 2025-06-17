import React, { useState, useEffect } from 'react';
import { useProducts } from './Productprovider';

export default function ProductHealthySnacks() {
  const { selectedSnacks, addToCart, total, setTotal, email } = useProducts();

  const [snacks, setSnacks] = useState([]);
  const [snackQuantities, setSnackQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState('');

  useEffect(() => {
    const fetchSnacks = async () => {
      try {
        const response = await fetch('https://yashmore-e5q6islzdq-uc.a.run.app/healthysnacks');
        const data = await response.json();
        console.log("Fetched Snacks Data:", data); // Debugging the fetched data
  
        if (data && Array.isArray(data.items)) {
          setSnacks(data.items);
        } else {
          console.error("API response does not contain an 'items' array:", data);
          setSnacks([]); // Prevent errors if `data.items` is missing
        }
      } catch (e) {
        console.error("Error fetching snacks:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSnacks();
  }, []);
  
  useEffect(() => {
    if (snacks.length > 0) {
      const initialQuantities = snacks.reduce(
        (acc, snack) => ({ ...acc, [snack.name]: 1 }),
        {}
      );
      setSnackQuantities(initialQuantities);
    }
  }, [snacks]);

  const handleQuantityChange = (snackName, newQuantity) => {
    setSnackQuantities((prev) => ({
      ...prev,
      [snackName]: Math.max(1, newQuantity),
    }));
  };

  const handleAddToCart = (snackName, price) => {
    const quantity = snackQuantities[snackName] || 1;
    const existingItem = selectedSnacks.find(item => item.name === snackName);
    if (existingItem) {
      // Update quantity if item already exists
      addToCart({ name: snackName, quantity, price }, 'snack');
    } else {
      // Add new item
      addToCart({ name: snackName, quantity, price }, 'snack');
    }
    setTotal((prevTotal) => prevTotal + price * quantity);
    setSnackQuantities((prev) => ({
      ...prev,
      [snackName]: 1,
    }));
  };

  const handleCheckout = async () => {
    if (!email) {
      alert("Please provide an email in the profile/settings before checking out!");
      return;
    }

    if (selectedSnacks.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsCheckout(true);
    setCheckoutStatus('Processing...');

    try {
      const enrichedSnacks = selectedSnacks.map(item => {
        const snackData = snacks.find(snack => snack.name === item.name);
        return {
          name: item.name,
          quantity: item.quantity,
          price: snackData ? snackData.price : 0,
        };
      });

      const cartData = {
        email,
        snacks: enrichedSnacks,
        total,
      };

      console.log("Sending cart data:", JSON.stringify(cartData)); // Debug log

      const response = await fetch('https://yashmore-e5q6islzdq-uc.a.run.app/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      const responseData = await response.json(); // Get response data
      console.log("API Response:", responseData); // Debug log

      if (!response.ok) {
        throw new Error(`Checkout failed: ${response.status} - ${responseData.message || 'Unknown error'}`);
      }

      setCheckoutStatus('Checkout successful! Thank you for your order.');
      alert("Checkout completed successfully!");

      // Reset cart after successful checkout
      setTotal(0);
      addToCart([], 'snack'); // Clear selectedSnacks
    } catch (error) {
      console.error('Checkout error:', error);
      setCheckoutStatus(`Checkout failed: ${error.message}. Please try again.`);
    } finally {
      setTimeout(() => {
        setIsCheckout(false);
        setCheckoutStatus('');
      }, 3000);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5">Error: {error.message}</div>;

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#E8F5E9', marginTop: '5rem' }}>
      <h2 className="text-center mb-5" style={{ color: '#2E7D32', fontWeight: '700', textShadow: '5px 5px 2px rgba(0,0,0,0.1)', fontFamily: 'cursive' }}>
        Our Healthy Snacks
      </h2>
      <div className="row g-4">
        {snacks.map((snack, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={index}>
            <div className="card h-100 shadow" style={{ backgroundColor: '#f5fff5', borderRadius: '15px', transition: 'transform 0.3s ease' }}>
              <img src={snack.image} className="card-img-top" alt={snack.name} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#2E7D32', fontWeight: '600' }}>{snack.name}</h5>
                <p className="card-text" style={{ color: '#666' }}>{snack.description}</p>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-flex align-items-center" style={{ border: '1px solid #4CAF50', borderRadius: '8px', padding: '0.4rem' }}>
                    <button className="btn px-2" onClick={() => handleQuantityChange(snack.name, Math.max(1, snackQuantities[snack.name] - 1))}>-</button>
                    <span className="mx-2">{snackQuantities[snack.name]}</span>
                    <button className="btn px-2" onClick={() => handleQuantityChange(snack.name, snackQuantities[snack.name] + 1)}>+</button>
                  </div>
                  <button
                    className="btn ms-2"
                    style={{ backgroundColor: '#4CAF50', color: 'white', borderRadius: '8px' }}
                    onClick={() => handleAddToCart(snack.name, snack.price)}
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
          <div className="card shadow" style={{ backgroundColor: '#f5fff5', borderRadius: '15px' }}>
            <div className="card-header text-center py-3" style={{ backgroundColor: '#4CAF50', color: 'white', fontWeight: '600' }}>
              Your Healthy Snack Selection
            </div>
            <div className="card-body p-4">
              {selectedSnacks && selectedSnacks.length > 0 ? (
                <>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Snack</th>
                          <th>Quantity</th>
                          <th className="text-end">Price</th>
                          <th className="text-end">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedSnacks.map((item, index) => {
                          const snack = snacks.find((s) => s.name === item.name);
                          return (
                            <tr key={index}>
                              <td>{item.name}</td>
                              <td>{item.quantity}</td>
                              <td className="text-end">${snack ? snack.price.toFixed(2) : 'N/A'}</td>
                              <td className="text-end">${snack ? (snack.price * item.quantity).toFixed(2) : 'N/A'}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot>
                        <tr>
                          <th colSpan="3" className="text-end">Total</th>
                          <th className="text-end">${total.toFixed(2)}</th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <button
                    className="btn w-50 mx-auto d-block mt-3"
                    style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none' }}
                    onClick={handleCheckout}
                    disabled={isCheckout}
                  >
                    {isCheckout ? 'Processing...' : 'Checkout'}
                  </button>
                  {checkoutStatus && (
                    <p className={`text-center mt-3 ${checkoutStatus.includes('failed') ? 'text-danger' : 'text-success'}`}>
                      {checkoutStatus}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-center">Your cart is empty. Start adding healthy snacks!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}