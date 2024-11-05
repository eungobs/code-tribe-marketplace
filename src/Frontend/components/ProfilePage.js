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
      } else {
        console.log("No user is currently logged in.");
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
          {/* Conditional rendering for image display */}
          <img
            src={userData.photoURL || localStorage.getItem('userImage') || 'https://via.placeholder.com/100'} // Placeholder image if no photoURL
            alt="User"
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Surname:</strong> {userData.surname}</p>
          <p><strong>Email:</strong> {auth.currentUser.email}</p>
          <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
          <p><strong>Address:</strong> {userData.address}</p>
          <p><strong>Role:</strong> {userData.role}</p> {/* Display user role */}
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
};

export default Profile;

