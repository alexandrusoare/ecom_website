import React, { useState } from 'react';
import { useLogin } from './LoginContext';
import { useNavigate } from 'react-router-dom';
import './ShoppingCart.css';

function ShoppingCart() {
  const { userId,cartItems, setCartItems } = useLogin();
  const [purchaseStatus, setPurchaseStatus] = useState(null);
  const navigate = useNavigate();


  const handleTotalCost = () => {
      return cartItems.reduce((total, item) => {
        const coursePrice = item.action === 'buy' ? item.course.price : item.course.rentalPrice;
        return total + coursePrice;
      }, 0);
  }

  const handleDeleteItem = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems.splice(index, 1); 
    setCartItems(updatedCartItems);
  };

  const handlePurchase = async () => {
    // Create an array of course IDs to be purchased
    try {
        // for (const item of cartItems) {
        //   await fetch(`/api/users/${userId}/${item.action}/${item.course._id}`, {
        //     method: 'POST',
        //   });
        // }
    
        // setCartItems([]);
        if (cartItems.length !== 0){
        navigate(`/payment?total=${handleTotalCost()}`);}
        else {
          let error = new Error("Cart is empty");
          throw(error);
        }
        // Clear the cart after purchase
      } catch (error) {
        console.error('Error during purchase:', error);
        // Handle error or display an error message
      }
  };
  return (
    <div className="shopping-cart">
      <h2 className='title'>Shopping Cart</h2>
      <div className='cart-grid'>
        <div className='cart-container'>

      {cartItems.length === 0 ? (
        <p id='empty'>Your cart is empty.</p>
      ) : (
        <div className='cart-card'>
          {cartItems.map((item, index) => (
            <div className='course-cart'>
                <div>
                  <p className='item'><b>Title: </b>{item.course.title}</p>
                  <p className='item'><b>Description: </b>{item.course.description}</p>
                </div>
                <div className='price'>
                  <p><b>{item.action}</b></p>
                  {item.action === 'buy'?(
                    <p>{item.course.price}$</p>
                  ):(
                    <p>{item.course.rentalPrice}$</p>
                  )}
                </div>
                <div className='delete-block' onClick={() => handleDeleteItem(index)}>
                  <p className='delete'>X</p>
                </div>
            </div>
          ))}
        </div>
        
      )}
          </div>
          <div className='cost'>
            <p>Total Price:</p>
            <p>{handleTotalCost()}$</p>
          <button className='confirm' onClick={handlePurchase}>Confirm Purchase</button>
          {purchaseStatus && <p>{purchaseStatus}</p>}
          </div>
          
          </div>
    </div>
  );
}

export default ShoppingCart;