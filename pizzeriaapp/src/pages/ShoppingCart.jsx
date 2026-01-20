import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import IngredientsModal from "../components/IngredientsModal";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const nav = useNavigate();

  // Fetch cart on page load
  useEffect(() => {
    fetchCart();
  }, []);

  // Get cart items from backend
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please login to view your cart");
      nav("/login");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(Array.isArray(res.data) ? res.data : []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load cart items");
      if (err.response?.status === 401) nav("/login");
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `/api/cart/${itemId}`,
        { quantity: newQty },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCart(); // refresh
    } catch (err) {
      console.error(err);
      alert("Failed to update quantity");
    }
  };

  // Remove item
  const removeItem = async (itemId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart(); // refresh
    } catch (err) {
      console.error(err);
      alert("Failed to remove item");
    }
  };

  // Handle customize
  const handleCustomize = (itemId) => {
    setSelectedItemId(itemId);
    setModalOpen(true);
  };

  // Update item with ingredients
  const handleAddIngredients = async (ingredients, extraPrice) => {
    const token = localStorage.getItem("token");
    const item = cartItems.find(i => (i.id || i._id) === selectedItemId);
    
    try {
      await axios.put(
        `/api/cart/${selectedItemId}`,
        {
          customIngredients: ingredients,
          customIngredientsPrice: extraPrice,
          price: item.price + extraPrice // Update total price
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setModalOpen(false);
      setSelectedItemId(null);
      fetchCart(); // refresh
      alert("Ingredients added!");
    } catch (err) {
      console.error(err);
      alert("Failed to customize item");
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (loading)
    return (
      <div className="cart-container">
        <p>Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="cart-container">
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  if (cartItems.length === 0)
    return (
      <div className="cart-container">
        <h2>Your Cart is Empty</h2>
        <p>Add some pizzas to get started!</p>
      </div>
    );

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <IngredientsModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleAddIngredients}
      />
      {cartItems.map((item) => (
        <div className="cart-item" key={item.id || item._id}>
          {item.image && <img src={item.image} alt={item.name} />}
          <div className="item-info">
            <h3>{item.name}</h3>
            <p>Base Price: ₹{item.price - (item.customIngredientsPrice || 0)}</p>
            
            {item.customIngredients && item.customIngredients.length > 0 && (
              <div className="custom-ingredients">
                <p><strong>Custom Ingredients:</strong></p>
                <ul>
                  {item.customIngredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
                {item.customIngredientsPrice > 0 && (
                  <p>Extra Charges: ₹{item.customIngredientsPrice}</p>
                )}
              </div>
            )}

            <div className="qty-controls">
              <button
                onClick={() =>
                  updateQuantity(item.id || item._id, item.quantity - 1)
                }
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.id || item._id, item.quantity + 1)
                }
              >
                +
              </button>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontWeight: "bold" }}>₹{(item.price * item.quantity).toFixed(2)}</p>
            <div className="item-actions">
              <button
                className="customize-item-btn"
                onClick={() => handleCustomize(item.id || item._id)}
              >
                Customize
              </button>
              <button
                className="remove-btn"
                onClick={() => removeItem(item.id || item._id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="cart-total">Total: ₹{totalPrice.toFixed(2)}</div>
      <button className="checkout-btn">Proceed to Checkout</button>
    </div>
  );
};

export default ShoppingCart;
