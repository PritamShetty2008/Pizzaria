// src/pages/OrderPizza.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import IngredientsModal from '../components/IngredientsModal';
import "./OrderPizza.css";


const OrderPizza = () => {
  const [pizzas, setPizzas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPizza, setSelectedPizza] = useState(null);

  useEffect(() => {
    axios.get('/api/pizzas').then(res => setPizzas(res.data));
  }, []);

  const handleCustomize = (pizza) => {
    setSelectedPizza(pizza);
    setModalOpen(true);
  };

  const handleAddWithIngredients = (ingredients, extraPrice) => {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/login';
    
    const cleanImg = (selectedPizza.image || '').split('%22')[0];
    axios.post('/api/cart', {
      name: selectedPizza.name,
      price: selectedPizza.price + extraPrice,
      image: cleanImg,
      quantity: 1,
      customIngredients: ingredients,
      customIngredientsPrice: extraPrice
    }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => {
        alert("Customized pizza added to cart!");
        setModalOpen(false);
        setSelectedPizza(null);
      })
      .catch(err => {
        console.error(err);
        if (err.response?.status === 401) window.location.href = '/login';
      });
  };

  const addToCart = (pizza) => {
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/login';
    const cleanImg = (pizza.image || '').split('%22')[0];
    axios.post('/api/cart', {
      name: pizza.name,
      price: pizza.price,
      image: cleanImg,
      quantity: 1
    }, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => alert("Added to cart!"))
      .catch(err => {
        console.error(err);
        if (err.response?.status === 401) window.location.href = '/login';
      });
  };

  return (
    <div className="pizza-grid">
      <IngredientsModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onConfirm={handleAddWithIngredients}
      />
      {pizzas.map(pizza => (
        <div className="pizza-card" key={pizza.id || pizza._id}>
          <div className="pizza-details">
            <h3>{pizza.name}</h3>
            <div className="price">₹{pizza.price}</div>
            <p className="desc">{pizza.description}</p>
            <div className="pizza-actions">
              <button className="yellow-btn" onClick={() => addToCart(pizza)}>Add to cart</button>
              <button className="customize-btn" onClick={() => handleCustomize(pizza)}>Customize</button>
            </div>
          </div>
          <div className="pizza-img-container">
            <img className="pizza-thumbnail" src={(pizza.image || '').split('%22')[0]} alt={pizza.name} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPizza;