import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { ref as dbRef, push, set, get } from "firebase/database"; // Import Realtime Database methods
import { Button, TextField, Typography } from '@mui/material';

const SellerPortal = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image as Base64 string
      };
      reader.readAsDataURL(file); // Convert to Base64
    }
  };

  const handleAddProduct = async () => {
    try {
      setUploading(true);

      // Define a new product entry reference
      const newProductRef = push(dbRef(db, 'products'));

      // Store product data including the Base64 image
      await set(newProductRef, {
        name: productName,
        price: parseFloat(price),
        description,
        image: image || "" // Store image as Base64, or empty if not uploaded
      });

      // Reset form fields
      setProductName('');
      setPrice('');
      setDescription('');
      setImage(null);
    } catch (error) {
      console.error("Error adding product: ", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Seller Portal</h2>
      <form>
        <TextField 
          label="Product Name" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          fullWidth 
        />
        <TextField 
          label="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          fullWidth 
        />
        <TextField 
          label="Description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          fullWidth 
        />
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          style={{ margin: '15px 0' }} 
        />
        {image && (
          <div>
            <img src={image} alt="Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />
          </div>
        )}
        <Button 
          onClick={handleAddProduct} 
          disabled={uploading}
          variant="contained" 
          color="primary"
        >
          {uploading ? "Uploading..." : "Add Product"}
        </Button>
      </form>
      <Typography variant="caption" color="textSecondary">
        {uploading && "Saving product details, please wait..."}
      </Typography>
    </div>
  );
};

export default SellerPortal;

