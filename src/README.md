# EasyBuy

## Overview
EasyBuy is an online marketplace designed specifically for farmers and vendors. The platform allows farmers to register as sellers and post their products for sale. Vendors can register as users to stock up on products from farmers, streamlining the process of sourcing goods for their businesses. This application aims to save vendors time and costs, allowing them to arrive at their selling spots earlier.

## Project Structure
The project consists of two main parts:
1. **Backend (NodeJS)**: A RESTful API that handles user authentication, product management, and order processing.
2. **Frontend (ReactJS)**: A user-friendly interface allowing farmers to sell their products and vendors to purchase them.

## Technologies Used
- **Backend**: 
  - NodeJS
  - Express
  - JWT for authentication
  - Mongoose/MongoDB for database management
- **Frontend**:
  - ReactJS
  - Axios for API requests
  - Redux for state management
- **Version Control**: Git (hosted on GitHub)
- **Database**: MongoDB/Firebase

## Features

### User Registration
- Users can choose to register as either a **Seller** (Farmer) or a **User** (Vendor) during the signup process.
- Each role has different functionalities once logged in.

### Farmer Features
- **Post Products**: Farmers can list their products for sale on the marketplace.
- **Update Products**: Farmers can update the details of their listed products.
- **Delete Products**: Farmers can remove their products from the marketplace.

### Vendor Features
- **Stock Products**: Vendors can browse and stock products from registered farmers.
- **Delivery Arrangements**: Farmers can arrange for delivery to the vendor's registered address, facilitating easier transactions.

## Deliverables
1. **NodeJS Backend**:
   - Fully functional REST API hosted on a server.
   - Clear API documentation (README or Swagger) detailing how to interact with the API.
   - Database setup and connection script included in the README.

2. **ReactJS Frontend**:
   - A simple, responsive web application that communicates with the backend.
   - User-friendly login and registration pages for both farmers and vendors.
   - Product listing page, product addition form, and other necessary features.

3. **Hosting**:
   - Both the frontend and backend are hosted as per the instructions.

   # Design
The design for EasyBuy was created using Figma. You can view the design [here](https://www.figma.com/design/uxZRatIhSu78aeAlkmJTra/Untitled?node-id=0-1&t=jQVEfgFxATaEVVdw-1).


## Installation Instructions
To run this project locally, follow these steps:

### Backend
1. Clone the repository:

   git clone https://github.com/eungobs/code-tribe-marketplace.git
Navigate to the backend directory:

cd backend
Install dependencies:

npm install
Set up your MongoDB database and connection in the configuration files.
Start the server:

Frontend
Navigate to the frontend directory:

cd frontend
Install dependencies:

npm install
Start the application:

npm start