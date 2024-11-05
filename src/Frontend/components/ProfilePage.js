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
        const docRef = doc(db, 'users', uid); // Fetch user data based on UID
        try {
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
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
          <img
            src={localStorage.getItem('userImage') || userData.photoURL} // Assuming 'photoURL' is the Firestore field for the image
            alt="User"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
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
