import React, { useState, useEffect } from 'react';
import { useProducts } from './Productprovider';

export default function ProductCookies() {
  const { selectedCookies, addToCart, total, setTotal, email } = useProducts();
  
  const [cookies, setCookies] = useState([]);
  const [cookieQuantities, setCookieQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCheckout, setIsCheckout] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState('');

  useEffect(() => {
    const fetchCookies = async () => {
      try {
        const response = await fetch('https://yashmore-e5q6islzdq-uc.a.run.app/donut');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCookies(data.items || []);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    fetchCookies();
  }, []);

  useEffect(() => {
    if (cookies.length > 0) {
      const initialQuantities = cookies.reduce(
        (acc, cookie) => ({ ...acc, [cookie.name]: 1 }),
        {}
      );
      setCookieQuantities(initialQuantities);
    }
  }, [cookies]);

  const handleQuantityChange = (cookieName, newQuantity) => {
    setCookieQuantities((prev) => ({
      ...prev,
      [cookieName]: Math.max(1, newQuantity),
    }));
  };

  const handleAddToCart = (cookieName, price) => {
    const quantity = cookieQuantities[cookieName] || 1;
    const existingItem = selectedCookies.find(item => item.name === cookieName);
    if (existingItem) {
      addToCart({ name: cookieName, quantity, price }, 'cookie');
    } else {
      addToCart({ name: cookieName, quantity, price }, 'cookie');
    }
    setTotal((prevTotal) => prevTotal + price * quantity);
    setCookieQuantities((prev) => ({
      ...prev,
      [cookieName]: 1,
    }));
  };

  const handleCheckout = async () => {
    if (!email) {
      alert("Please provide an email in the profile/settings before checking out!");
      return;
    }

    if (selectedCookies.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setIsCheckout(true);
    setCheckoutStatus('Processing...');

    try {
      const enrichedCookies = selectedCookies.map(item => {
        const cookieData = cookies.find(cookie => cookie.name === item.name);
        return {
          name: item.name,
          quantity: item.quantity,
          price: cookieData ? cookieData.price : 0,
        };
      });

      const cartData = {
        email,
        donuts: enrichedCookies,
        total,
      };

      console.log("Sending cart data:", JSON.stringify(cartData));

      const response = await fetch('https://yashmore-e5q6islzdq-uc.a.run.app/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartData),
      });

      const responseData = await response.json();
      console.log("API Response:", responseData);

      if (!response.ok) {
        throw new Error(`Checkout failed: ${response.status} - ${responseData.message || 'Unknown error'}`);
      }

      setCheckoutStatus('Checkout successful! Thank you for your order.');
      alert("Checkout completed successfully!");
      setTotal(0);
      addToCart([], 'cookie');
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

  const handleProceedToCheckout = () => {
    if (selectedCookies.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Your order has been recorded!");
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5">Error: {error.message}</div>;

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#EACFEC', marginTop: '5rem' }}>
      <h2 className="text-center mb-5" style={{ color: '#663399', fontSize: '2rem', fontWeight: '700' }}>
        Our Delicious Donuts
      </h2>
      <div className="row g-4">
        {cookies.map((cookie) => (
          <div className="col-12 col-md-6 col-lg-4" key={cookie.id}>
            <div className="card h-100 shadow" style={{ backgroundColor: '#fff0f5', borderRadius: '15px' }}>
              <img src={cookie.image} className="card-img-top" alt={cookie.name} style={{ height: '250px', objectFit: 'cover' }} />
              <div className="card-body">
                <h5 className="card-title" style={{ color: '#663399' }}>{cookie.name}</h5>
                <p className="card-text" style={{ color: '#666' }}>{cookie.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="quantity-selector d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleQuantityChange(cookie.name, Math.max(1, cookieQuantities[cookie.name] - 1))}
                    >
                      -
                    </button>
                    <span className="mx-2">{cookieQuantities[cookie.name]}</span>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleQuantityChange(cookie.name, cookieQuantities[cookie.name] + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(cookie.name, cookie.price)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row mt-5">
        <div className="col-12 col-lg-8 offset-lg-2">
          <div className="card shadow" style={{ backgroundColor: '#fff0f5', borderRadius: '15px' }}>
            <div className="card-header text-center" style={{ backgroundColor: '#EF62DA', color: 'white', fontSize: '1.5rem' }}>
              Your Donut Selection
            </div>
            <div className="card-body">
              {selectedCookies.length > 0 ? (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Donut</th>
                        <th>Quantity</th>
                        <th className="text-end">Price</th>
                        <th className="text-end">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCookies.map((item, index) => {
                        const cookieData = cookies.find((c) => c.name === item.name);
                        return (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td className="text-end">${cookieData.price.toFixed(2)}</td>
                            <td className="text-end">${(cookieData.price * item.quantity).toFixed(2)}</td>
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
                  <div className="d-flex justify-content-center gap-3 mt-3">
                   
                    <button
                      className="btn " style={{ backgroundColor: '#EF62DA', color: 'white' }}
                      onClick={handleProceedToCheckout}
                      disabled={isCheckout}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                  {checkoutStatus && (
                    <p className={`text-center mt-3 ${checkoutStatus.includes('failed') ? 'text-danger' : 'text-success'}`}>
                      {checkoutStatus}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-center">No items in your cart.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}