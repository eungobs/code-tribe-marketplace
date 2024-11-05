import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { ref as dbRef, push, set, get, update, remove } from "firebase/database";
import { Button, TextField, Typography } from '@mui/material';

const SellerPortal = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null); // Track if editing a product

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const snapshot = await get(dbRef(db, 'products'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const productsArray = Object.keys(data).map(id => ({ id, ...data[id] }));
        setProducts(productsArray);
      }
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddOrUpdateProduct = async () => {
    try {
      setUploading(true);
      const productData = {
        name: productName,
        price: parseFloat(price),
        description,
        image: image || ""
      };

      if (editProductId) {
        // Update product
        await update(dbRef(db, `products/${editProductId}`), productData);
        setEditProductId(null); // Clear edit mode
      } else {
        // Add new product
        const newProductRef = push(dbRef(db, 'products'));
        await set(newProductRef, productData);
      }

      // Reset form fields
      setProductName('');
      setPrice('');
      setDescription('');
      setImage(null);
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Error adding/updating product: ", error);
    } finally {
      setUploading(false);
    }
  };

  const handleEditProduct = (product) => {
    setProductName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description);
    setImage(product.image);
    setEditProductId(product.id);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await remove(dbRef(db, `products/${productId}`));
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Error deleting product: ", error);
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
          onClick={handleAddOrUpdateProduct} 
          disabled={uploading}
          variant="contained" 
          color="primary"
        >
          {uploading ? "Uploading..." : editProductId ? "Update Product" : "Add Product"}
        </Button>
      </form>
      <Typography variant="caption" color="textSecondary">
        {uploading && "Saving product details, please wait..."}
      </Typography>

      <h3>Product List</h3>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h4>{product.name}</h4>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            {product.image && <img src={product.image} alt="Product" style={{ width: '100px', height: '100px' }} />}
            <Button onClick={() => handleEditProduct(product)} variant="outlined" color="primary">
              Edit
            </Button>
            <Button onClick={() => handleDeleteProduct(product.id)} variant="outlined" color="secondary">
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SellerPortal;

