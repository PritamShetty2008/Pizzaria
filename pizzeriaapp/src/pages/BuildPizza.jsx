// src/pages/BuildPizza.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./BuildPizza.css";


const BuildPizza = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('/api/ingredients').then(res => setIngredients(res.data));
  }, []);

  const handleCheckboxChange = (ing, isChecked) => {
    const next = isChecked ? [...selectedIngredients, ing.name] : selectedIngredients.filter(i => i !== ing.name);
    setSelectedIngredients(next);
    const newTotal = next.reduce((acc, name) => {
      const it = ingredients.find(x => x.name === name);
      return acc + (it ? it.price : 0);
    }, 0);
    setTotal(newTotal);
  };

  const buildAndAddToCart = () => {
    if (selectedIngredients.length === 0) return alert("Please select at least one ingredient!");
    const token = localStorage.getItem('token');
    if (!token) return window.location.href = '/login';

    const customPizza = {
      name: "Custom Pizza",
      price: total,
      image: "https://thumb9.shutterstock.com/display_pic_with_logo/376831/127528958/stock-photo-delicious-italian-pizza-over-white-127528958.jpg",
      quantity: 1,
      description: "Custom ingredients: " + selectedIngredients.join(', ')
    };

    axios.post('/api/cart', customPizza, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => alert("Custom Pizza added to cart!"))
      .catch(err => {
        console.error(err);
        if (err.response?.status === 401) window.location.href = '/login';
      });
  };

  return (
    <div className="build-container">
      <h3>Build Your Pizza</h3>
      <p>Select ingredients to create a custom pizza.</p>
      <table className="ingredient-table">
        <tbody>
          {ingredients.map(ing => (
            <tr key={ing.id || ing._id}>
              <td><img className="ing-thumbnail" src={(ing.image || '').split('%22')[0]} alt={ing.name} /></td>
              <td>{ing.name}</td>
              <td>₹{ing.price}</td>
              <td>
                <input type="checkbox" onChange={e => handleCheckboxChange(ing, e.target.checked)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginTop:20}}>
        <strong>Total: ₹{total}</strong>
        <button style={{marginLeft:20}} onClick={buildAndAddToCart}>Add custom pizza to cart</button>
      </div>
    </div>
  );
};

export default BuildPizza;