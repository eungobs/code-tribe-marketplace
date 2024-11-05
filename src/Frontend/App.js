// src/frontend/App.js
import React from 'react';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import LoginForm from './components/LoginForm'; // Ensure this path is correct
import SignupForm from './components/SignupForm'; // Ensure this path is correct
import SellerPortal from './Frontend/components/SellerPortal';
import Profile from './components/Profile'; // Import Profile component
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/seller-portal" element={<SellerPortal />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/profile" element={<Profile />} /> {/* Add route for Profile */}
          {/* Additional routes can be added here */}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;