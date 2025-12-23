# YzConnect Buyer Mobile App

A professional React Native mobile application for the YzConnect platform, enabling buyers to shop for groceries from local stores and homemade food from apartment dwellers.

## 📋 Features

### 1. Authentication
- **Login Screen**: Email/password authentication with mock credentials
- **Signup Screen**: User registration with email, phone, and password validation
- Demo credentials available for testing

### 2. Shop Grocery (Local Stores)
- Browse fresh vegetables, fruits, dairy, and bakery items
- Filter by product categories
- View product details with ratings and descriptions
- Direct pricing from local stores
- Add to cart functionality

### 3. ApartmentEats (Neighbor Food)
- Browse homemade food from apartment dwellers
- Categories: Indian, Continental, South Indian, Snacks, Desserts
- Preparation time displayed for each item
- Seller ratings and reviews
- Add to cart with quantity selection

### 4. Shopping Cart
- View all items from both sources (grocery & food)
- Adjust quantities dynamically
- Remove items
- Real-time total calculation

### 5. Checkout & Orders
- Delivery address entry
- Payment method selection (Card, Wallet, Cash on Delivery)
- Order confirmation with order ID
- Order tracking and history
- Order status updates (Confirmed, Delivered, etc.)

### 6. User Profile
- View and edit personal information
- Manage delivery addresses
- Payment methods management
- Notification preferences
- Dark mode toggle (upcoming)

## 🛠️ Tech Stack

- **Framework**: React Native 0.72.6
- **Development**: Expo 49.0.0
- **Navigation**: React Navigation 6.x
  - Native Stack Navigator for screen stacks
  - Bottom Tab Navigator for main tabs
- **State Management**: Redux + Redux Thunk
- **HTTP Client**: Axios
- **UI**: Expo Linear Gradient, Native UI Components
- **Color Scheme**: Professional Green (#2E7D32) & Orange (#FF9800)

## 📁 Project Structure

```
yzconnect-buyer-mobile/
├── src/
│   ├── screens/
│   │   ├── auth/
│   │   │   ├── LoginScreen.js          # Email/password login
│   │   │   └── SignupScreen.js         # User registration
│   │   ├── home/
│   │   │   └── HomeScreen.js           # Home with shopping options
│   │   ├── products/
│   │   │   └── ProductListScreen.js    # Product listing (grocery/food)
│   │   ├── cart/
│   │   │   └── CartScreen.js           # Shopping cart management
│   │   ├── orders/
│   │   │   └── OrdersScreen.js         # Order history & tracking
│   │   └── profile/
│   │       └── ProfileScreen.js        # User account settings
│   ├── redux/
│   │   ├── store.js                    # Redux store configuration
│   │   └── slices/
│   │       ├── authSlice.js            # Authentication state
│   │       ├── productSlice.js         # Products state
│   │       ├── cartSlice.js            # Shopping cart state
│   │       └── orderSlice.js           # Orders state
│   ├── services/
│   │   └── api.js                      # Mock API services
│   ├── theme/
│   │   └── colors.js                   # Color palette & gradients
│   └── App.jsx                          # Main navigation setup
├── package.json                         # Dependencies
├── app.json                             # Expo configuration
├── index.js                             # App entry point
└── README.md                            # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Installation

1. **Navigate to project directory**
   ```bash
   cd yzconnect-buyer-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   expo start
   ```

4. **Run on device/emulator**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app (mobile)

## 🔐 Mock Authentication

### Test Credentials
- **Email**: buyer@yzconnect.com
- **Password**: password123

> Note: These are mock credentials. The app uses simulated API responses for demonstration.

## 🛒 Mock Data

### Grocery Products
- Fresh Tomatoes, Carrots, Apples, Milk, Bread, Eggs
- Simulated prices and ratings
- Local store sellers

### Apartment Food
- Homemade Biryani, Butter Chicken, Samosas
- Chocolate Brownies, Pasta, Dosa
- Neighbor sellers with preparation times

### Mock Orders
- Sample order history with delivery status
- Order tracking timestamps
- Total amount calculations

## 🎨 Design System

### Color Palette
- **Primary Green**: #2E7D32 (main actions, headers)
- **Primary Light**: #4CAF50 (highlights, backgrounds)
- **Primary Dark**: #1B5E20 (deep actions)
- **Secondary Orange**: #FF9800 (accents, secondary actions)
- **Neutral Grays**: #f8f9fa, #e0e0e0, #999, #666, #333

### Gradients
- **Primary Gradient**: Green shades for main UI
- **Secondary Gradient**: Orange shades for accents
- **Food Gradient**: Warm colors for food items
- **Apartment Gradient**: Neutral tones for apartments

## 📱 Screen Navigation

```
Auth Flow:
├── LoginScreen
└── SignupScreen

Main App (Tab Navigation):
├── Shop Tab (HomeNavigator Stack)
│   ├── HomeScreen (with 2 main options)
│   ├── GroceryShopping (ProductListScreen)
│   ├── ApartmentFood (ProductListScreen)
│   └── Cart
├── Orders Tab (OrderNavigator Stack)
│   └── OrdersScreen
└── Account Tab (ProfileNavigator Stack)
    └── ProfileScreen
```

## 🔄 State Management

### Redux Slices

**authSlice.js**
- Manages user login/signup state
- Stores user info, token, loading state
- Actions: loginRequest, loginSuccess, loginFailure, logout

**productSlice.js**
- Manages grocery and apartment food listings
- Stores products with filtering capability
- Actions: fetchProductsRequest, fetchProductsSuccess, setSelectedCategory

**cartSlice.js**
- Manages shopping cart items
- Calculates totals and item counts
- Actions: addToCart, removeFromCart, updateQuantity, clearCart

**orderSlice.js**
- Manages order creation and history
- Tracks order status
- Actions: createOrderRequest, createOrderSuccess, fetchOrdersSuccess

## 🌐 API Services (Mock)

### authService
- `login(email, password)` - User authentication
- `signup(name, email, password, phone)` - New user registration

### productService
- `getGroceryProducts(categoryId)` - Fetch grocery items
- `getApartmentFood(categoryId)` - Fetch food items

### orderService
- `createOrder(cartItems, address, paymentMethod)` - Place order
- `getOrders(userId)` - Fetch user orders
- `getOrderDetails(orderId)` - Get specific order details

> All API calls return mock data with realistic 800ms-1500ms delays to simulate network requests.

## ✨ Key Features Implementation

### Professional UI/UX
- Consistent color scheme throughout
- Smooth gradients and transitions
- Clear typography hierarchy
- Intuitive navigation flow
- Loading states and error handling

### Cart Management
- Add/remove items from both sources
- Real-time quantity updates
- Dynamic total calculations
- Item source differentiation (grocery vs food)

### Order Flow
- Delivery address input validation
- Payment method selection
- Order confirmation with ID
- Order tracking with status updates

### User Experience
- Demo credentials for easy testing
- Clear error messages with alerts
- Success confirmations for actions
- Empty state screens with guidance

## 🧪 Testing

### Test Scenarios

1. **Authentication**
   - Sign up with new account
   - Login with test credentials
   - Logout functionality

2. **Shopping**
   - Browse grocery items
   - Browse apartment food
   - Filter by category
   - Add/remove items

3. **Cart Operations**
   - Add items from different sources
   - Update quantities
   - Remove items
   - View totals

4. **Checkout**
   - Enter delivery address
   - Select payment method
   - Complete order
   - View order confirmation

5. **Order Tracking**
   - View order history
   - Check order status
   - View order details

## 📦 Dependencies

```json
{
  "expo": "^49.0.0",
  "react-native": "0.72.6",
  "@react-navigation/native": "^6.1.7",
  "@react-navigation/native-stack": "^6.9.13",
  "@react-navigation/bottom-tabs": "^6.5.10",
  "@reduxjs/toolkit": "^1.9.5",
  "react-redux": "^8.1.2",
  "axios": "^1.4.0",
  "expo-linear-gradient": "^12.3.1"
}
```

## 🚧 Future Enhancements

- Real API integration
- Payment gateway integration
- Real-time order tracking with maps
- User reviews and ratings
- Wishlist/Favorites
- Search and advanced filtering
- Push notifications
- Dark mode theme
- Multiple language support
- User profile picture upload

## 📝 Notes

- All API calls are mocked with realistic delays
- Images use placeholder URLs (https://via.placeholder.com)
- Redux store persists within session
- No actual payment processing
- For production, integrate with real backend services

## 🤝 Contributing

This is a demo/prototype application for the YzConnect platform. For contributions or suggestions, please contact the development team.

## 📄 License

This project is part of the YzConnect platform and is proprietary software.

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Development/Demo
