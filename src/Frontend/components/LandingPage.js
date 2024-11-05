import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import { Button, Modal, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import '../../styles/LandingPage.css';

const LandingPage = () => {
  const [cartCount, setCartCount] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [userData, setUserData] = useState(null); // State to hold user data
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from local storage or any source
    const storedUserData = {
      name: localStorage.getItem('userName'),
      surname: localStorage.getItem('userSurname'),
      email: localStorage.getItem('userEmail'),
      // Add other fields as necessary
    };
    setUserData(storedUserData);
  }, []);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  const handleOpenSignup = () => setOpenSignup(true);
  const handleCloseSignup = () => setOpenSignup(false);

  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  const addToCart = () => {
    setCartCount(prevCount => prevCount + 1);
  };

  const navigateToSellerPortal = () => {
    navigate('/sellerportal');
  };

  return (
    <Container className="full-height-container mt-5">
      <header className="header-icons">
        <Button onClick={handleOpenLogin}>Login</Button>
        <Button onClick={handleOpenSignup}>Signup</Button>

        <Badge
          badgeContent={cartCount}
          color="secondary"
          onClick={addToCart}
          className="cart-icon"
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
          {/* Product listing goes here */}
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
                {/* Add more user details as necessary */}
              </div>
            ) : (
              <p>No user data available.</p>
            )}
          </div>
        </Modal>

        <Button
          variant="contained"
          color="primary"
          className="add-to-cart-btn"
          onClick={addToCart}
        >
          Add to Cart
        </Button>
      </div>

      {/* Footer Section with Seller Portal Link */}
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



