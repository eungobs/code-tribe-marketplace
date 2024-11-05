import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const ViewCart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();

  // Retrieve cart items from state
  const cartItems = location.state ? location.state.cartItems : [];
  const totalPrice = location.state ? location.state.totalPrice : 0;

  const handleQuantityChange = (product, change) => {
    // Update quantity logic here if needed
  };

  const proceedToPayment = () => {
    const user = auth.currentUser;
    if (user) {
      navigate('/payment');
    } else {
      alert('You must be logged in to proceed to payment.');
      navigate('/login');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Row>
          {cartItems.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <div className="cart-item">
                <h3>{product.name}</h3>
                <p>Price: R{product.price}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Total: R{product.price * product.quantity}</p>
                <Button onClick={() => handleQuantityChange(product, -1)}>Remove</Button>
              </div>
            </Col>
          ))}
        </Row>
      )}
      <h3>Total Price: R{totalPrice}</h3>
      <Button onClick={proceedToPayment}>Proceed to Payment</Button>
    </Container>
  );
};

export default ViewCart;
