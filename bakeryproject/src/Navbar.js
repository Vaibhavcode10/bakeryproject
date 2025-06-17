import React, { useState, useEffect, useRef } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import Searchicon from './Allimages/Searchicon.bmp';
import profile from './Allimages/Profile.bmp';
 


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref to track the dropdown container

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Close the dropdown
      }
    };

    // Add event listener when the dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    // Cleanup the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]); // Re-run effect when isDropdownOpen changes
  const navigate = useNavigate(); // Hook for navigation

  const handleProfileClick = () => {
    navigate("/"); // Navigate to root route (/)
  };
  return (
<> 
<nav style={{ 
      backgroundColor: 'transparent',
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '1.5rem 20px', 
      height: '4rem',
      position: 'fixed',  // Keeps navbar fixed at the top
      top: 0,             // Sticks to the top
      left: 0,
      width: '100%',      // Full width
      zIndex: 1000,       // Keeps navbar above other content
      backdropFilter: 'blur(3px)' // Optional for a glass effect
    }}>
    
      <div style={{ display: 'flex', alignItems: 'center' }} className='container'>
        <div style={{ fontSize: '28px', fontWeight: 'bold', marginRight: '10px' }} className='ms-5' >Puffin bakery</div>
        <ul style={{ 
          display: 'flex', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0,
          fontSize: '1.3rem' // Increased font size for main navigation items
        }}>
          <li style={{ margin: '0 15px' }}>
            <Link 
              to="/home" 
              style={{ 
                textDecoration: 'none', 
                color: '#000',
                position: 'relative',
                transition: 'all 0.3s ease',
                padding: '8px 12px',
                borderRadius: '4px'
              }}
              className="nav-link"
            >
              Home
            </Link>
          </li>
          <li style={{ margin: '0 15px', position: 'relative' }} ref={dropdownRef}>
            <div 
              onClick={toggleDropdown}
              style={{ 
                textDecoration: 'none', 
                color: '#000', 
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.3s ease',
                padding: '8px 12px',
                borderRadius: '4px'
              }}
              className="nav-link"
            >
              Products
            </div>
            {isDropdownOpen && (
              <ul style={{ 
                position: 'absolute', 
                top: '100%', 
                left: 0, 
                backgroundColor: '#FFEDFDFF', 
                border: '1px solid #ccc', 
                borderRadius: '4px', 
                padding: '10px', 
                listStyle: 'none', 
                paddingLeft: '25px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                width: '250px',
                fontSize: '1.2rem' // Keep font size for dropdown items unchanged
              }}>
                <li style={{ margin: '5px 0' }}>
                <Link 
                      to="/products/cookies" 
                      style={{ 
                        textDecoration: 'none', 
                        color: '#000',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}
                      className="nav-link"
                    >
                       Cookie
                    </Link>
                </li>
           
                  <li style={{ margin: '5px 0' }}>
                    <Link 
                      to="/products/Healthy-Snacks" 
                      style={{ 
                        textDecoration: 'none', 
                        color: '#000',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}
                      className="nav-link"
                    >
                          Healthy Snacks
                    </Link>
                  </li>
                  <li style={{ margin: '5px 0' }}>
                    <Link 
                      to="/products/Pastry" 
                      style={{ 
                        textDecoration: 'none', 
                        color: '#000',
                        position: 'relative',
                        transition: 'all 0.3s ease',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}
                      className="nav-link"
                    >
                   Pastry
                    </Link>
                  </li>
               
                <li style={{ margin: '5px 0' }}>
                  <Link 
                    to="/products/Donuts" 
                    style={{ 
                      textDecoration: 'none', 
                      color: '#000',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}
                    className="nav-link"
                  >
                    Donuts
                  </Link>
                </li>
                <li style={{ margin: '5px 0' }}>
                  <Link 
                    to="/products/The-Ultimate-Cookie" 
                    style={{ 
                      textDecoration: 'none', 
                      color: '#000',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      padding: '4px 8px',
                      borderRadius: '4px'
                    }}
                    className="nav-link"
                  >
                        The Ultimate Cookie
               
                  </Link>
                </li>
                
              </ul>
            )}
          </li>
          <li style={{ margin: '0 15px' }}>
            <Link 
              to="/about-us" 
              style={{ 
                textDecoration: 'none', 
                color: '#000',
                position: 'relative',
                transition: 'all 0.3s ease',
                padding: '8px 12px',
                borderRadius: '4px'
              }}
              className="nav-link"
            >
              About Us
            </Link>
          </li>
          <li style={{ margin: '0 15px' }}>
            <Link 
              to="/contact-us" 
              style={{ 
                textDecoration: 'none', 
                color: '#000',
                position: 'relative',
                transition: 'all 0.3s ease',
                padding: '8px 12px',
                borderRadius: '4px'
              }}
              className="nav-link"
            >
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }} >
       
        <input 
          type="text" 
          placeholder="Search" 
          style={{ 
            padding: '8px', 
            marginRight: '10px', 
            border: 'none', 
            borderRadius: '4px',
            fontSize: '1rem',
            backgroundColor:'#F8F3F9FF',
            outline:'none',
            color:'grey'
          }} 
        />
      <button
  onClick={handleProfileClick}
  style={{ border: "none", background: "none", padding: 0 }}
>
  <img
    src={profile}
    alt="Profile"
    style={{
      width: "20px",
      height: "20px",
      marginRight: "10px",
      borderRadius: "20px",
      cursor: "pointer",
    }}
    className="bg-body bg-light"
  />
</button>
      </div>

      {/* Add CSS for the hover effect */}
      <style>
        {`
          .nav-link {
            display: inline-block;
            position: relative;
          }

          .nav-link::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            background: pink;
            bottom: -5px;
            left: 0;
            transition: width 0.3s ease;
          }

          .nav-link:hover::after {
            width: 100%;
          }

          .nav-link:hover {
            background-color: rgba(0, 0, 0, 0.05); /* Light background on hover */
            color: #007bff; /* Change text color on hover */
          }

          .nav-link:active {
            background-color: rgba(0, 0, 0, 0.1); /* Slightly darker background on click */
            transform: scale(0.98); /* Slight scale down effect on click */
          }

          .nav-link:focus {
            outline: none; /* Remove default focus outline */
          }
        `}
      </style>
    </nav>
   
    </>
  );
};

export default Navbar;