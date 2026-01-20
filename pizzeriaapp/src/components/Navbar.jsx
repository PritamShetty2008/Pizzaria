import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (rawUser) {
      setUser(JSON.parse(rawUser));
    } else if (token) {
      // try to decode email/name from token payload as fallback
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const name = payload.name || payload.email || payload.id;
        setUser({ name });
      } catch (err) {
        setUser(null);
      }
    }

    setIsLoggedIn(Boolean(token));
    if (token) fetchCartCount(token);

    const onStorage = (e) => {
      if (e.key === 'token' || e.key === 'user') {
        const newUser = localStorage.getItem('user');
        setUser(newUser ? JSON.parse(newUser) : null);
        const newToken = localStorage.getItem('token');
        setIsLoggedIn(Boolean(newToken));
        if (newToken) fetchCartCount(newToken); else setCartCount(0);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const fetchCartCount = async (token) => {
    try {
      const res = await axios.get('/api/cart', { headers: { Authorization: `Bearer ${token}` } });
      setCartCount(Array.isArray(res.data) ? res.data.length : 0);
    } catch (err) {
      setCartCount(0);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsLoggedIn(false);
    setCartCount(0);
    nav('/login');
  };

  // small helper to avoid collision and long names
  const displayName = user?.name
    ? (typeof user.name === 'string' && user.name.length > 14 ? user.name.slice(0, 13) + '…' : user.name)
    : null;

  return (
    <nav className="navbar" style={{ padding: '10px 24px' }}>
      <Link to="/" className="nav-brand-link" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/logo.png" alt="Pizzeria Logo" className="nav-logo" />
          <span className="brand-title">Pizzeria</span>
        </div>
      </Link>

      <div className="nav-links" style={{ marginLeft: 24 }}>
        <Link to="/" style={{ color: 'white', marginRight: 16 }}>Our Story</Link>
        <Link to="/order" style={{ color: 'white', marginRight: 16 }}>Order Pizza</Link>
        <Link to="/build" style={{ color: 'white', marginRight: 16 }}>Build Ur Pizza</Link>
      </div>

      <div className="nav-right" style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        {isLoggedIn && displayName && (
          <div style={{
            color: '#fff',
            padding: '6px 10px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: 6,
            fontWeight: 600,
            maxWidth: 160,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {displayName}
          </div>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login" style={{ color: 'white', textDecoration: 'none', marginRight: 8 }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none', marginRight: 8 }}>Register</Link>
          </>
        )}

        {isLoggedIn && (
          <>
            <Link to="/cart">
              <button className="cart-button" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
                  width="20"
                  alt="cart icon"
                />
                <span style={{ color: '#000', fontWeight: 600 }}>Cart</span>
                {cartCount > 0 && (
                  <span style={{
                    display: 'inline-block',
                    minWidth: 20,
                    padding: '2px 6px',
                    borderRadius: 12,
                    background: '#333',
                    color: '#fff',
                    fontSize: 12,
                    textAlign: 'center'
                  }}>{cartCount}</span>
                )}
              </button>
            </Link>
            <button onClick={handleLogout} className="yellow-btn" style={{ marginLeft: 6 }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;