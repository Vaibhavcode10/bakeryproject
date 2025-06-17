import React, { useState, useEffect } from 'react';
import { useProducts } from './Productprovider';

export default function ProductCookies() {
  const { selectedCookies, addToCart, total, setTotal, email } = useProducts();
  const [cookies, setCookies] = useState([]);
  const [cookieQuantities, setCookieQuantities] = useState({});
  const [isCheckout, setIsCheckout] = useState(false);
  const [checkoutStatus, setCheckoutStatus] = useState('');

  useEffect(() => {
    fetch('https://yashmore-e5q6islzdq-uc.a.run.app/bakery')
      .then(res => res.json())
      .then(data => {
        const cookiesArray = data.items || [];
        setCookies(cookiesArray);
        setCookieQuantities(Object.fromEntries(cookiesArray.map(cookie => [cookie.id, 1])));
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  const handleQuantityChange = (cookieName, newQuantity) => {
    setCookieQuantities(prev => ({
      ...prev,
      [cookieName]: Math.max(1, newQuantity)
    }));
  };

  const handleAddToCart = (cookieName, price) => {
    const quantity = cookieQuantities[cookieName] || 1;
    const existingItem = selectedCookies.find(item => item.name === cookieName);
    if (existingItem) {
      // Update quantity if item already exists
      addToCart({ name: cookieName, quantity, price }, 'cookie');
    } else {
      // Add new item
      addToCart({ name: cookieName, quantity, price }, 'cookie');
    }
    setTotal(prevTotal => prevTotal + price * quantity);
    setCookieQuantities(prev => ({ ...prev, [cookieName]: 1 }));
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
          price: cookieData ? cookieData.price : 0
        };
      });

      const cartData = {
        email,
        cookies: enrichedCookies,
        total
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
      addToCart([], 'cookie'); // Clear selectedCookies by replacing with empty array
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

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: '#EACFEC', marginTop: '5rem' }}>
      <h2 className="text-center mb-5" style={{ color: '#FFF', fontSize: '2rem', fontWeight: '700', textShadow: '2px 2px 2px rgba(0,0,0,0.1)', fontFamily: 'cursive' }}>
        Our Delicious Cookies
      </h2>
      <div className="row g-4">
        {cookies.map((cookie, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={index}>
            <div className="card h-100 shadow" style={{ backgroundColor: '#fff0f5', borderRadius: '15px' }}>
              <img src={cookie.image} className="card-img-top" alt={cookie.name} style={{ height: '250px', objectFit: 'cover' }} />
              <div className="card-body text-center">
                <h5 className="card-title" style={{ color: '#663399', fontSize: '1.5rem', fontWeight: '600' }}>{cookie.name}</h5>
                <p className="card-text" style={{ color: '#666' }}>{cookie.description}</p>
                <p className="fw-bold" style={{ color: '#F34DFF' }}>
                  ${cookie.price ? cookie.price.toFixed(2) : "N/A"}
                </p>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <button className="btn btn-outline-primary" onClick={() => handleQuantityChange(cookie.name, cookieQuantities[cookie.name] - 1 || 1)}>-</button>
                  <span>{cookieQuantities[cookie.name] || 1}</span>
                  <button className="btn btn-outline-primary" onClick={() => handleQuantityChange(cookie.name, (cookieQuantities[cookie.name] || 1) + 1)}>+</button>
                </div>
                <button style={{ backgroundColor: '#F34DFF', color: '#fff' }} className="btn  mt-2" onClick={() => handleAddToCart(cookie.name, cookie.price)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-5">
        <div className="card shadow p-4" style={{ backgroundColor: '#fff0f5', borderRadius: '15px' }}>
          <h4 className="text-center" style={{ color: '#663399' }}>Your Cookie Selection</h4>
          {selectedCookies.length > 0 ? (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>Cookie</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCookies.map((item, index) => {
                    const cookieData = cookies.find(cookie => cookie.name === item.name);
                    const subtotal = cookieData ? cookieData.price * item.quantity : 0;
                    return (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${cookieData ? cookieData.price.toFixed(2) : "N/A"}</td>
                        <td>${subtotal.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <h5 className="text-end mt-3">Total: ${total.toFixed(2)}</h5>
              <button 
                className="btn mt-3 w-50 mx-auto" 
                style={{color: '#fff0f5', backgroundColor: '#E746C1FF'}} 
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
            <p className="text-center">No cookies added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}