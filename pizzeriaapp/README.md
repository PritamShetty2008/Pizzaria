# Pizzeria - Online Pizza Ordering App

A modern web application for ordering customizable pizzas online. Built with React, Vite, and Node.js.

## Features

- **User Authentication** - Register and login with secure password hashing
- **Pizza Catalog** - Browse pre-made pizzas with descriptions and prices
- **Customize Pizza** - Build your own pizza by selecting ingredients
- **Custom Orders** - Add customizations to pre-made pizzas
- **Shopping Cart** - Add, remove, and modify items in your cart
- **Responsive Design** - Works seamlessly on desktop and mobile devices

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool for fast development
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## Project Structure

```
PRITAM_SHETTY_Pizza/
├── pizzeriaapp/          # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   └── package.json
│
└── pizzariaserver/       # Backend (Node.js + Express)
    ├── models/           # MongoDB schemas
    ├── routes/           # API endpoints
    ├── middleware/       # Authentication middleware
    ├── server.js         # Main server file
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd pizzariaserver
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd pizzeriaapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Pizzas
- `GET /api/pizzas` - Get all pizzas
- `GET /api/ingredients` - Get all ingredients

### Shopping Cart
- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart

## Pages

- **Home** - Landing page with pizzeria story
- **Order Pizza** - Browse and order pre-made pizzas
- **Build Pizza** - Create custom pizza from scratch
- **Customize** - Add ingredients to existing pizzas
- **Shopping Cart** - Review and manage orders
- **Login/Register** - User authentication

## Features in Detail

### Customization
- **Order Page Customization**: Click "Customize" on any pizza to add extra ingredients
- **Cart Customization**: Modify ingredients on items already in your cart
- **Ingredient Selection**: Modal interface to select from all available ingredients
- **Price Calculation**: Automatically calculates total with ingredient additions

## License

This project is open source and available under the MIT License.

## Author

Pritam Shetty

