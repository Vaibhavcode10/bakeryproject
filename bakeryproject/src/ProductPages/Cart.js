import React, { useState } from 'react';
import { useProducts } from './Productprovider'; // Adjust the path based on your file structure

const Cart = () => {
  const { selectedCookies, email, sendCartToBackend } = useProducts();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendToBackend = async () => {
    setLoading(true);
    setError('');
    try {
      await sendCartToBackend();
      alert('Cart data sent to backend successfully!');
    } catch (err) {
      setError('Failed to send cart data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Your Cart</h2>
      <p>Email: {email || 'Not logged in'}</p>
      
      <h3>Selected Cookies</h3>
      {selectedCookies.length === 0 ? (
        <p>No cookies selected yet.</p>
      ) : (
        <ul>
          {selectedCookies.map((cookie, index) => (
            <li key={index}>
              {cookie.name} - Quantity: {cookie.quantity} 
              {cookie.price && ` - Price: $${cookie.price}`}
            </li>
          ))}
        </ul>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button
        onClick={handleSendToBackend}
        disabled={loading || selectedCookies.length === 0}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#6b4e31',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading || selectedCookies.length === 0 ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Sending...' : 'Send Cart to Backend'}
      </button>
    </div>
  );
};

export default Cart;