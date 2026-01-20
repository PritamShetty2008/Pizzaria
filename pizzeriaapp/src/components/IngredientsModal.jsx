import { useState, useEffect } from 'react';
import axios from 'axios';
import './IngredientsModal.css';

const IngredientsModal = ({ isOpen, onClose, onConfirm, initialIngredients = [] }) => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (isOpen) {
      axios
        .get('/api/ingredients')
        .then(res => {
          setIngredients(res.data);
          // Initialize with existing ingredients if provided
          if (initialIngredients.length > 0) {
            setSelectedIngredients(initialIngredients);
          }
        })
        .catch(err => console.error('Error fetching ingredients:', err));
    }
  }, [isOpen]);

  useEffect(() => {
    const total = selectedIngredients.reduce((acc, ingName) => {
      const ingredient = ingredients.find(i => i.name === ingName);
      return acc + (ingredient ? ingredient.price : 0);
    }, 0);
    setTotalPrice(total);
  }, [selectedIngredients, ingredients]);

  const handleToggleIngredient = (ingName) => {
    if (selectedIngredients.includes(ingName)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingName));
    } else {
      setSelectedIngredients([...selectedIngredients, ingName]);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedIngredients, totalPrice);
    setSelectedIngredients([]);
    setTotalPrice(0);
  };

  const handleCancel = () => {
    setSelectedIngredients([]);
    setTotalPrice(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Customize with Ingredients</h2>
          <button className="modal-close" onClick={handleCancel}>×</button>
        </div>

        <div className="ingredients-list">
          {ingredients.length === 0 ? (
            <p>Loading ingredients...</p>
          ) : (
            ingredients.map(ing => (
              <div key={ing.id || ing._id} className="ingredient-item">
                <div className="ingredient-left">
                  {ing.image && (
                    <img 
                      src={(ing.image || '').split('%22')[0]} 
                      alt={ing.name} 
                      className="ingredient-img"
                    />
                  )}
                  <div className="ingredient-info">
                    <h4>{ing.name}</h4>
                    <span className="ingredient-price">₹{ing.price}</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedIngredients.includes(ing.name)}
                  onChange={() => handleToggleIngredient(ing.name)}
                  className="ingredient-checkbox"
                />
              </div>
            ))
          )}
        </div>

        <div className="modal-footer">
          <div className="total-price">
            <strong>Extra Charges: ₹{totalPrice.toFixed(2)}</strong>
          </div>
          <div className="modal-buttons">
            <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
            <button className="btn-confirm" onClick={handleConfirm}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngredientsModal;
