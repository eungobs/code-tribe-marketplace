// src/App.js
import React from 'react';
import LandingPage from './Frontend/components/LandingPage';
import ProductList from './Frontend/components/ProductList';
import LoginForm from './Frontend/components/LoginForm';
import SignupForm from './Frontend/components/SignupForm';
import SellerPortal from './Frontend/components/SellerPortal';
import { Provider } from 'react-redux';
import { store } from './Frontend/redux/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/sellerportal" element={<SellerPortal />} />
          {/* Additional routes can be added here */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
