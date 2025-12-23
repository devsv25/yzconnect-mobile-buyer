# YzConnect Mobile App - Quick Start Guide

## ⚡ Quick Setup (5 minutes)

### 1. Install Dependencies
```bash
cd yzconnect-mobile
npm install
```

### 2. Start the App
```bash
expo start
```

### 3. Run on Device/Emulator

**iOS Simulator**:
- Press `i` in terminal
- Simulator will open automatically

**Android Emulator**:
- Start Android emulator first
- Press `a` in terminal

**Physical Device**:
- Install "Expo Go" app from App Store / Play Store
- Scan QR code shown in terminal
- App will open on your device

### 4. Login with Demo Credentials
```
Email: buyer@yzconnect.com
Password: password123
```

---

## 📱 What You'll See

### Home Screen
- Welcome message with user's name
- Two main option cards:
  - 🛒 **Shop Grocery** - Buy from local stores
  - 🍜 **ApartmentEats** - Buy homemade food from neighbors
- Features and quick tips sections

### Try Shopping
1. Click "Shop Grocery"
2. See 6 grocery products (tomatoes, carrots, milk, bread, eggs, apples)
3. Click a product to see details
4. Use +/- to select quantity
5. Click "Add to Cart"

### Try ApartmentEats
1. Back to home, click "ApartmentEats"
2. See 6 food items (biryani, butter chicken, samosas, brownies, pasta, dosa)
3. Add items to cart
4. View preparation times

### Shopping Cart
1. Click cart button or navigate to Cart screen
2. View all items (grocery + food mixed)
3. Adjust quantities or remove items
4. See price breakdown with taxes

### Checkout
1. Enter delivery address
2. Select payment method (Card / Wallet / COD)
3. Click "Checkout"
4. See order confirmation with Order ID

### View Orders
1. Click "Orders" tab
2. See order history
3. Track order status

### Account
1. Click "Account" tab
2. View profile information
3. Access settings and preferences
4. Logout

---

## 🎨 Design Highlights

- **Color Scheme**: Professional Green (#2E7D32) & Orange (#FF9800)
- **Gradients**: Beautiful gradient backgrounds
- **Cards**: Clean card-based layouts
- **Typography**: Clear, readable fonts
- **Spacing**: Professional, organized spacing

---

## 🛒 Mock Data

### Grocery Products (6 items)
- Fresh Tomatoes - $3.99
- Organic Carrots - $2.49
- Apples (6 pcs) - $4.99
- Milk (1L) - $2.99
- Bread Loaf - $2.50
- Eggs (12) - $3.49

### Apartment Food (6 items)
- Homemade Biryani - $8.99
- Butter Chicken - $9.99
- Homemade Samosas - $4.99
- Chocolate Brownies - $5.99
- Pasta Primavera - $7.99
- Dosa & Sambar - $6.99

---

## 🔧 Key Features

✅ **Authentication**: Login/Signup with validation
✅ **Shopping**: Browse products from two sources
✅ **Cart**: Add, remove, update quantities
✅ **Checkout**: Delivery address & payment method
✅ **Orders**: Track order history and status
✅ **Profile**: User account management
✅ **State Management**: Redux for robust data flow
✅ **Mock API**: All services use realistic mock data

---

## 📁 Project Structure

```
yzconnect-mobile/
├── src/
│   ├── screens/          # All UI screens
│   ├── redux/            # State management
│   ├── services/         # API services
│   ├── theme/            # Design system
│   └── App.jsx           # Main navigation
├── package.json          # Dependencies
├── app.json              # Expo config
├── index.js              # Entry point
└── README.md             # Full documentation
```

---

## 🧪 Test Scenarios

### Test 1: Complete Shopping Flow
1. Login with demo credentials
2. Browse grocery items
3. Add 2 tomatoes to cart
4. Browse apartment food
5. Add 1 biryani to cart
6. Go to cart
7. Verify 2 items, 3 total quantity
8. Proceed to checkout
9. Enter address "123 Main St"
10. Select "Cash on Delivery"
11. Confirm order
12. View in orders tab

### Test 2: User Management
1. Signup with new email
2. Fill in name, email, phone, password
3. Create account
4. View profile
5. Check order history (empty initially)
6. Access settings
7. Logout
8. Verify back at login

### Test 3: Cart Operations
1. Add various items from both sources
2. Update quantities
3. Remove some items
4. View price breakdown
5. Clear cart
6. Verify empty state

---

## 🚀 Troubleshooting

### App won't start
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
expo start --clear
```

### Can't connect to emulator
```bash
# For iOS
npm start -- -c --ios

# For Android
npm start -- -c --android
```

### Port already in use
```bash
# Use different port
expo start --port 8081
```

### Image loading issues
- App uses placeholder images from placeholder URLs
- No local images required
- Images will work once connected to real backend

---

## 💡 Tips & Tricks

1. **Hot Reload**: Changes appear instantly
2. **Redux DevTools**: Install for state debugging
3. **Demo Mode**: All API calls use mock data
4. **Multiple Tabs**: Can test navigation between tabs
5. **Form Validation**: Try invalid email/password to see errors

---

## 📊 Testing Checklist

- [ ] App launches successfully
- [ ] Login works with demo credentials
- [ ] Signup creates new account
- [ ] Home screen displays both options
- [ ] Grocery products load
- [ ] Apartment food loads
- [ ] Add to cart works
- [ ] Cart calculations correct
- [ ] Checkout process works
- [ ] Order confirmation displays
- [ ] Orders tab shows history
- [ ] Profile displays user info
- [ ] Logout works
- [ ] All screens responsive

---

## 🔗 Useful Commands

```bash
# Start development
expo start

# Run on iOS
expo start --ios

# Run on Android
expo start --android

# Build for production
expo build:ios
expo build:android

# Install new package
npm install package-name

# Update dependencies
npm update

# Clear cache
expo start --clear
```

---

## 📞 Support & Documentation

- **README.md** - Complete feature documentation
- **PROJECT_OVERVIEW.md** - Architecture and specifications
- **IMPLEMENTATION_SUMMARY.md** - Technical implementation details
- **Code Comments** - Inline code documentation

---

## ✅ What's Included

✅ 7 fully functional screens
✅ Redux state management
✅ Mock API services
✅ Professional UI design
✅ Complete navigation flow
✅ Form validation
✅ Error handling
✅ Loading states
✅ Comprehensive documentation

---

## 🎯 Next Steps

1. **Run the app** and explore all screens
2. **Test the complete flow** from login to order confirmation
3. **Review the code** to understand architecture
4. **Connect to backend** by replacing mock APIs
5. **Deploy to app stores** after testing

---

## ℹ️ Info

- **Version**: 1.0.0
- **Status**: Ready for Testing
- **Framework**: React Native + Expo
- **State Management**: Redux
- **API**: Mock (Ready for real backend integration)
- **Design**: Professional, Modern
- **Demo Credentials**: buyer@yzconnect.com / password123

---

**Happy Testing! 🚀**

Get started with: `npm install && expo start`
