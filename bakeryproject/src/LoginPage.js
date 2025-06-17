import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useProducts } from './ProductPages/Productprovider'; // Import the context hook

const Login = () => {
  const navigate = useNavigate();
  const { setEmail } = useProducts(); // Access setEmail from context
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = isRegister
      ? 'https://yashmore-e5q6islzdq-uc.a.run.app/register'
      : 'https://yashmore-e5q6islzdq-uc.a.run.app/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        console.log(isRegister ? 'Registration successful:' : 'Login successful:', data);
        if (!isRegister) {
          setEmail(formData.email); // Set email in context after successful login
          navigate('/home'); // Redirect to home after login
        } else {
          setIsRegister(false); // Switch to login after successful registration
        }
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again later.');
      console.error(isRegister ? 'Registration error:' : 'Login error:', err);
    }
  };

  return (
    <div
      style={{ backgroundColor: '#f9e8d9', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <div
        style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '350px' }}
        className="p-4 rounded shadow"
      >
        <h2 className="text-center mb-4" style={{ color: '#6b4e31' }}>Sweet Delights Bakery</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-3">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="form-control"
                style={{ padding: '10px', border: '1px solid #d3b99f', borderRadius: '5px' }}
              />
            </div>
          )}
          <div className="mb-3">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
              style={{ padding: '10px', border: '1px solid #d3b99f', borderRadius: '5px' }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
              style={{ padding: '10px', border: '1px solid #d3b99f', borderRadius: '5px' }}
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: loading ? '#8a5f3c' : '#6b4e31', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer' }}
            disabled={loading}
          >
            {loading ? 'Processing...' : isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        <p className="text-center mt-3">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="btn btn-link p-0"
            style={{ color: '#6b4e31', textDecoration: 'none', fontWeight: 'bold' }}
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;