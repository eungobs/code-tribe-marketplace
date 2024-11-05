import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

const SignupForm = ({ closeModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [identityNumber, setIdentityNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null); // State to hold image
  const [error, setError] = useState('');

  const handleSignup = async () => {
    // Input validations
    if (!email || !password || !name || !surname || !identityNumber || !phoneNumber || !address) {
      setError("All fields are required.");
      return;
    }

    // Email validation: must end with @gmail.com or @yahoo.com
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
    if (!emailPattern.test(email)) {
      setError("Email must be a valid Gmail or Yahoo address.");
      return;
    }

    // Password validation: must be at least 6 characters
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Prepare user data for Firestore
      const userData = {
        role: 'vendor',
        name,
        surname,
        identityNumber,
        phoneNumber,
        address,
      };

      // Store user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);

      // Handle image upload logic if an image is selected
      if (image) {
        console.log('Image to upload:', image);
        // Your image upload logic here (e.g., uploading to Firebase Storage)
      }

      closeModal();
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Failed to create account. Please check your details.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Update the image state with the selected file
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Identity Number"
        value={identityNumber}
        onChange={(e) => setIdentityNumber(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      <input
        type="file"
        accept="image/*" // Accepts only image files
        onChange={handleImageChange} // Calls the handler on file selection
      />
      <Button variant="contained" onClick={handleSignup} fullWidth>Signup</Button>
    </div>
  );
};

export default SignupForm;


