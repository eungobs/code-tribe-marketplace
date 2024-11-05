import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Modal, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { db } from '../firebaseConfig'; // Ensure this points to your firebase config
import { ref, get } from 'firebase/database';
import '../../styles/LandingPage.css';

const LandingPage = () => {
  const [cartCount, setCartCount] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = {
      name: localStorage.getItem('userName'),
      surname: localStorage.getItem('userSurname'),
      email: localStorage.getItem('userEmail'),
    };
    setUserData(storedUserData);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const snapshot = await get(ref(db, 'products'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productsArray = Object.keys(data).map((id) => ({
          id,
          ...data[id],
        }));
        setProducts(productsArray);

        const initialQuantities = {};
        productsArray.forEach(product => {
          initialQuantities[product.name] = 0;
        });
        setQuantities(initialQuantities);
      } else {
        console.log('No products available.');
      }
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);
  const handleOpenSignup = () => setOpenSignup(true);
  const handleCloseSignup = () => setOpenSignup(false);
  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  const addToCart = (product) => {
    const newQuantities = { ...quantities, [product.name]: quantities[product.name] + 1 };
    setQuantities(newQuantities);
    setCartCount(cartCount + 1);
  };

  const removeFromCart = (product) => {
    if (quantities[product.name] > 0) {
      const newQuantities = { ...quantities, [product.name]: quantities[product.name] - 1 };
      setQuantities(newQuantities);
      setCartCount(cartCount - 1);
    }
  };

  const navigateToCart = () => {
    const cartItems = products
      .filter(product => quantities[product.name] > 0)
      .map(product => ({
        name: product.name,
        price: product.price,
        quantity: quantities[product.name],
        id: product.id,
        image: product.image // Ensure image is included
      }));
    const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    navigate('/viewcart', { state: { cartItems, totalPrice } });
  };

  // Function to navigate to Seller Portal
  const navigateToSellerPortal = () => {
    navigate('/seller-portal');
  };

  return (
    <Container className="full-height-container mt-5">
      <header className="header-icons">
        <Button onClick={handleOpenLogin}>Login</Button>
        <Button onClick={handleOpenSignup}>Signup</Button>

        <Badge
          badgeContent={cartCount}
          color="secondary"
          className="cart-icon"
          onClick={navigateToCart}
        >
          <ShoppingCartIcon />
        </Badge>
        <Button onClick={handleOpenProfile} className="profile-icon">
          <AccountCircleIcon />
        </Button>
      </header>

      <div className="main-content">
        <h1 className="logo">EasyBuy</h1>
        <h2 className="special-sale">Today's Special Sale</h2>
        <Row>
          {products.map((product) => (
            <Col key={product.id} md={4} className="mb-4">
              <div className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>Price: R{product.price}</p>
                <p>{product.description}</p>
                <div className="quantity-controls">
                  <Button
                    variant="outlined"
                    onClick={() => removeFromCart(product)}
                    disabled={quantities[product.name] === 0}
                  >
                    <RemoveIcon />
                  </Button>
                  <span>{quantities[product.name]}</span>
                  <Button variant="outlined" onClick={() => addToCart(product)}>
                    <AddIcon />
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Modal open={openLogin} onClose={handleCloseLogin}>
          <div className="modal-content">
            <LoginForm closeModal={handleCloseLogin} />
          </div>
        </Modal>

        <Modal open={openSignup} onClose={handleCloseSignup}>
          <div className="modal-content">
            <SignupForm closeModal={handleCloseSignup} />
          </div>
        </Modal>

        <Modal open={openProfile} onClose={handleCloseProfile}>
          <div className="modal-content">
            <h3>User Profile</h3>
            {userData ? (
              <div>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>Surname:</strong> {userData.surname}</p>
                <p><strong>Email:</strong> {userData.email}</p>
              </div>
            ) : (
              <p>No user data available.</p>
            )}
          </div>
        </Modal>
      </div>

      <footer className="footer">
        © 2024 EasyBuy. All Rights Reserved.
        <Button
          onClick={navigateToSellerPortal}
          className="seller-portal-link"
        >
          Seller Portal
        </Button>
      </footer>
    </Container>
  );
};

export default LandingPage;
