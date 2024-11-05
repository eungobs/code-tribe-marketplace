// src/frontend/components/Profile.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig'; // Ensure correct path for firebaseConfig
import { doc, getDoc } from 'firebase/firestore';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const uid = auth.currentUser.uid;
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          console.log("No such document!");
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <img src={localStorage.getItem('userImage')} alt="User" style={{ width: '100px', height: '100px' }} />
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Surname:</strong> {userData.surname}</p>
          <p><strong>Identity Number:</strong> {userData.identityNumber}</p>
          <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Email:</strong> {auth.currentUser.email}</p>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Profile;


