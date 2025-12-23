// Mock delay function to simulate network latency
const simulateNetworkDelay = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Mock data
const MOCK_GROCERY_PRODUCTS = [
  {
    id: 'g1',
    name: 'Organic Apples',
    category: 'fruits',
    price: 4.99,
    image: 'https://via.placeholder.com/200?text=Apples',
    description: 'Fresh organic apples from local farms',
    seller: 'Fresh Farms Co.',
  },
  {
    id: 'g2',
    name: 'Whole Wheat Bread',
    category: 'bakery',
    price: 2.99,
    image: 'https://via.placeholder.com/200?text=Bread',
    description: 'Freshly baked whole wheat bread',
    seller: 'Daily Bakery',
  },
  {
    id: 'g3',
    name: 'Organic Milk',
    category: 'dairy',
    price: 3.49,
    image: 'https://via.placeholder.com/200?text=Milk',
    description: 'Pure organic milk from grass-fed cows',
    seller: 'Dairy Delights',
  },
  {
    id: 'g4',
    name: 'Cheddar Cheese',
    category: 'dairy',
    price: 6.99,
    image: 'https://via.placeholder.com/200?text=Cheese',
    description: 'Aged cheddar cheese block',
    seller: 'Dairy Delights',
  },
  {
    id: 'g5',
    name: 'Spinach Bundle',
    category: 'vegetables',
    price: 2.49,
    image: 'https://via.placeholder.com/200?text=Spinach',
    description: 'Fresh spinach greens',
    seller: 'Fresh Farms Co.',
  },
  {
    id: 'g6',
    name: 'Tomatoes',
    category: 'vegetables',
    price: 3.99,
    image: 'https://via.placeholder.com/200?text=Tomatoes',
    description: 'Ripe red tomatoes',
    seller: 'Fresh Farms Co.',
  },
];

const MOCK_APARTMENT_FOOD = [
  {
    id: 'f1',
    name: 'Margherita Pizza',
    category: 'pizza',
    price: 12.99,
    image: 'https://via.placeholder.com/200?text=Pizza',
    description: 'Classic margherita pizza with fresh basil',
    prepareTime: '30 mins',
    store: 'Pizza Palace',
    rating: 4.5,
  },
  {
    id: 'f2',
    name: 'Chicken Biryani',
    category: 'indian',
    price: 10.99,
    image: 'https://via.placeholder.com/200?text=Biryani',
    description: 'Aromatic basmati rice with tender chicken',
    prepareTime: '35 mins',
    store: 'Spice Route',
    rating: 4.7,
  },
  {
    id: 'f3',
    name: 'Pad Thai',
    category: 'asian',
    price: 9.99,
    image: 'https://via.placeholder.com/200?text=Pad+Thai',
    description: 'Stir-fried noodles with shrimp and vegetables',
    prepareTime: '25 mins',
    store: 'Thai Express',
    rating: 4.4,
  },
  {
    id: 'f4',
    name: 'Burger Deluxe',
    category: 'burgers',
    price: 11.99,
    image: 'https://via.placeholder.com/200?text=Burger',
    description: 'Double patty burger with cheese and bacon',
    prepareTime: '20 mins',
    store: 'Burger House',
    rating: 4.6,
  },
  {
    id: 'f5',
    name: 'Sushi Roll Combo',
    category: 'sushi',
    price: 14.99,
    image: 'https://via.placeholder.com/200?text=Sushi',
    description: 'Assorted fresh sushi rolls',
    prepareTime: '15 mins',
    store: 'Sushi Bay',
    rating: 4.8,
  },
  {
    id: 'f6',
    name: 'Caesar Salad',
    category: 'salads',
    price: 7.99,
    image: 'https://via.placeholder.com/200?text=Salad',
    description: 'Fresh romaine with parmesan and croutons',
    prepareTime: '10 mins',
    store: 'Healthy Kitchen',
    rating: 4.3,
  },
];

// Auth Service
export const authService = {
  async login(email, password) {
    await simulateNetworkDelay(1200);

    if (!email || !password) {
      return {
        status: 400,
        error: 'Email and password are required',
      };
    }

    // Mock successful login
    return {
      status: 200,
      data: {
        user: {
          id: 'user_123',
          email,
          name: email.split('@')[0],
          phone: '+1234567890',
        },
        token: 'mock_jwt_token_' + Date.now(),
      },
    };
  },

  async signup(email, password, name, phone) {
    await simulateNetworkDelay(1500);

    if (!email || !password || !name) {
      return {
        status: 400,
        error: 'Email, password and name are required',
      };
    }

    // Mock successful signup
    return {
      status: 200,
      data: {
        user: {
          id: 'user_' + Date.now(),
          email,
          name,
          phone,
        },
        token: 'mock_jwt_token_' + Date.now(),
      },
    };
  },

  async logout() {
    await simulateNetworkDelay(500);
    return { status: 200, data: { message: 'Logged out successfully' } };
  },
};

// Product Service
export const productService = {
  async getGroceryProducts() {
    await simulateNetworkDelay(800);
    return {
      status: 200,
      data: MOCK_GROCERY_PRODUCTS,
    };
  },

  async getApartmentFood() {
    await simulateNetworkDelay(1000);
    return {
      status: 200,
      data: MOCK_APARTMENT_FOOD,
    };
  },

  async getProductById(productId, type) {
    await simulateNetworkDelay(600);
    const products =
      type === 'grocery' ? MOCK_GROCERY_PRODUCTS : MOCK_APARTMENT_FOOD;
    const product = products.find((p) => p.id === productId);

    if (product) {
      return { status: 200, data: product };
    }
    return { status: 404, error: 'Product not found' };
  },
};

// Order Service
export const orderService = {
  async createOrder(cartItems, deliveryInfo) {
    await simulateNetworkDelay(2000);

    if (!cartItems || cartItems.length === 0) {
      return {
        status: 400,
        error: 'Cart is empty',
      };
    }

    const order = {
      id: 'order_' + Date.now(),
      items: cartItems,
      totalPrice: cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
      deliveryInfo,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 30 * 60000).toISOString(),
    };

    return {
      status: 200,
      data: order,
    };
  },

  async getOrders(userId) {
    await simulateNetworkDelay(1000);

    // Mock order history
    const mockOrders = [
      {
        id: 'order_1',
        items: [
          {
            product: MOCK_APARTMENT_FOOD[0],
            quantity: 1,
          },
        ],
        totalPrice: 12.99,
        status: 'delivered',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60000).toISOString(),
      },
      {
        id: 'order_2',
        items: [
          {
            product: MOCK_GROCERY_PRODUCTS[0],
            quantity: 2,
          },
          {
            product: MOCK_GROCERY_PRODUCTS[1],
            quantity: 1,
          },
        ],
        totalPrice: 10.97,
        status: 'delivered',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60000).toISOString(),
      },
    ];

    return {
      status: 200,
      data: mockOrders,
    };
  },

  async trackOrder(orderId) {
    await simulateNetworkDelay(800);

    return {
      status: 200,
      data: {
        id: orderId,
        status: 'in-transit',
        currentLocation: 'On the way',
        estimatedArrival: new Date(Date.now() + 15 * 60000).toISOString(),
      },
    };
  },
};
