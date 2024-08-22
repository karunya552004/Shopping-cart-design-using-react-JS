import React from 'react';
import React, { useReducer } from 'react';
import './Cart.css';

const initialState = {
  cart: [],
  total: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItem = action.item;
      const existingItem = state.cart.find(item => item.id === newItem.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item => {
            if (item.id === newItem.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          })
        };
      } else {
        return { ...state, cart: [...state.cart, { ...newItem, quantity: 1 }] };
      }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.id === action.itemId) {
            return { ...item, quantity: action.quantity };
          }
          return item;
        })
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.itemId)
      };
    default:
      return state;
  }
};

const Cart = () => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = item => {
    dispatch({ type: 'ADD_ITEM', item });
  };

  const updateQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', itemId, quantity });
  };

  const removeItem = itemId => {
    dispatch({ type: 'REMOVE_ITEM', itemId });
  };

  const cookieProducts = [
    { id: 1, name: 'Chocolate Chip Cookies', price: 5.99 },
    { id: 2, name: 'Peanut Butter Cookies', price: 6.99 },
    { id: 3, name: 'Gingerbread Cookies', price: 6.49 },
    { id: 4, name: 'Shortbread Cookies', price: 5.99 },
    { id: 5, name: 'Sugar Cookies', price: 4.99 },
  ];

  const calculateTotal = () => {
    let total = 0;
    state.cart.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Cookie Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.cart.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>
                <button className="update-quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                {item.quantity}
                <button className="update-quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </td>
              <td>${item.price}</td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button className="remove-item-btn" onClick={() => removeItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3">Total:</td>
            <td>${calculateTotal()}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <div className="cookie-products">
        {cookieProducts.map(product => (
          <div key={product.id} className="cookie-product">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price}</p>
            <button className="add-item-btn" onClick={() => addItem(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;