import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentProcess.css';
import cardImage from './resources/credit-card.png';
import { useLogin } from './LoginContext';

function PaymentProcess() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const totalAmount = queryParams.get('total');
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [ccv, setCcv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentAttempted, setPaymentAttempted] = useState(false);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const { userId, cartItems, setCartItems } = useLogin();
  const [isPaymentSuccessMessageVisible, setPaymentSuccessMessageVisible] = useState(false);
  const [isFullNameValid, setIsFullNameValid] = useState(true);
    const [isCardNumberValid, setIsCardNumberValid] = useState(true);
    const [isExpirationValid, setIsExpirationValid] = useState(true);
    const [isCcvValid, setIsCcvValid] = useState(true);
  

  const handleCardNumberChange = (event) => {
    const inputText = event.target.value;
    const numericValue = inputText.replace(/\D/g, ''); // Remove non-numeric characters
  
    const formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');
  
    if (formattedValue.length <= 19) {
      setCardNumber(formattedValue);
      
    }
  };

  const handleExpirationChange = (event) => {
    const formattedValue = event.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d{2})/, '$1/');

    if (formattedValue.length <= 5) {
      setExpiration(formattedValue);
      
    }
  };

  const handleCcvChange = (event) => {
    const formattedValue = event.target.value.replace(/\D/g, '');

    if (formattedValue.length <= 3) {
      setCcv(formattedValue);
      
    }
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setPaymentAttempted(true);
    
    // Validate input fields
    const isFullNameValid = name.length >= 6;
    const isCardNumberValid = cardNumber.replace(/\s/g, '').length === 16;
    const isExpirationValid = expiration.replace(/\D/g, '').length === 4;
    const isCcvValid = ccv.replace(/\D/g, '').length === 3;
      
    try {
      // Validate the form
      if (!isFullNameValid || !isCardNumberValid || !isExpirationValid || !isCcvValid) {
        setIsProcessing(false);
        return;
      }
  
      // Simulate payment processing
      setTimeout(async () => {
        const isSuccessful = Math.random() < 0.8; // Simulate a successful payment with 80% probability
    
        setIsProcessing(false);
  
        if (isSuccessful) {
          // Add products to the user profile
          for (const item of cartItems) {
            await fetch(`/api/users/${userId}/${item.action}/${item.course._id}`, {
              method: 'POST',
            });
          }
    
          // Clear the shopping cart after successful payment
          setCartItems([]);
  
          // Show the payment successful message
          setPaymentSuccessMessageVisible(true);
          
          // Set payment successful status
          setIsPaymentSuccessful(true);
  
          // Delay redirection and clearing of success message
          setTimeout(() => {
            setPaymentSuccessMessageVisible(false);
            setIsPaymentSuccessful(false);
            navigate('/profile');
          }, 2000);
        } else {
          // Show the payment failed message
          setIsPaymentSuccessful(false);
        }
      }, 2000);
    } catch (error) {
      console.error('Error during payment:', error);
      setIsProcessing(false);
    }
  };
  
  
  
  return (
    <div className="payment-container">
      <h2 className="pay-title">Payment Process</h2>
      <div className="payment-card">
        {isPaymentSuccessful ? (
          <div className="payment-success">
            <p>Payment successful!</p>
          </div>
        ) : (
          <div>
            <div className="grid">
              <div className="details">
                <label>Full name</label>
                <input
                  id="fullname"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={6}
                />
                <label>Card number</label>
                <input
                  id="cardnumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => handleCardNumberChange(e)}
                  placeholder="1234 1234 1234 1234"
                  required
                  minLength={19}
                />
                <div className="grid-sml">
                  <div>
                    <label>Expiration Date</label>
                    <input
                      id="expiration"
                      placeholder="MM/YY"
                      value={expiration}
                      onChange={(e) => handleExpirationChange(e)}
                      required
                      minLength={5}
                    />
                  </div>
                  <div>
                    <label>CCV</label>
                    <input
                      id="ccv"
                      placeholder="XXX"
                      value={ccv}
                      onChange={(e) => handleCcvChange(e)}
                      required
                      minLength={3}
                    />
                  </div>
                </div>
                <button id="submit" onClick={handlePayment} disabled={isProcessing}>
                  {isProcessing ? 'Processing...' : 'Submit Payment'}
                </button>
                {paymentAttempted && !isProcessing && !isPaymentSuccessful && (
                  <p className="error">Payment failed. Please try again.</p>
                )}
              </div>
              <div className="image-card">
                <img id="credit-card" src={cardImage} alt="Credit Card" />
                <label id="total">Total:</label>
                <p>{totalAmount}$</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentProcess;
