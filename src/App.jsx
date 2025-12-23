import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider, useSelector } from 'react-redux';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import store from './redux/store';

// Screens
import LoginScreen from './screens/auth/LoginScreen';
import SignupScreen from './screens/auth/SignupScreen';
import HomeScreen from './screens/home/HomeScreen';
import ProductListScreen from './screens/products/ProductListScreen';
import CartScreen from './screens/cart/CartScreen';
import OrdersScreen from './screens/orders/OrdersScreen';
import ProfileScreen from './screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Signup" component={SignupScreen} />
  </Stack.Navigator>
);

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2E7D32',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="HomeScreen" 
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen 
      name="GroceryShopping" 
      component={ProductListScreen}
      options={{ title: 'Shop Grocery Items' }}
      initialParams={{ type: 'grocery', title: 'Shop Grocery' }}
    />
    <Stack.Screen 
      name="ApartmentFood" 
      component={ProductListScreen}
      options={{ title: 'ApartmentEats' }}
      initialParams={{ type: 'apartment', title: 'ApartmentEats' }}
    />
    <Stack.Screen 
      name="Cart" 
      component={CartScreen}
      options={{ title: 'Shopping Cart' }}
    />
  </Stack.Navigator>
);

const OrderNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2E7D32',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="OrderHistory" 
      component={OrdersScreen}
      options={{ title: 'My Orders', headerShown: false }}
    />
  </Stack.Navigator>
);

const ProfileNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#2E7D32',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{ title: 'My Account', headerShown: false }}
    />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#2E7D32',
      tabBarInactiveTintColor: '#999',
      tabBarStyle: {
        backgroundColor: '#fff',
        borderTopColor: '#e0e0e0',
        borderTopWidth: 1,
      },
    }}
  >
    <Tab.Screen 
      name="HomeTab" 
      component={HomeNavigator}
      options={{
        title: 'Shop',
        tabBarLabel: 'Shop',
        tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>🛒</Text>,
      }}
    />
    <Tab.Screen 
      name="OrdersTab" 
      component={OrderNavigator}
      options={{
        title: 'Orders',
        tabBarLabel: 'Orders',
        tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>📦</Text>,
      }}
    />
    <Tab.Screen 
      name="ProfileTab" 
      component={ProfileNavigator}
      options={{
        title: 'Account',
        tabBarLabel: 'Account',
        tabBarIcon: ({ color, size }) => <Text style={{ fontSize: size, color }}>👤</Text>,
      }}
    />
  </Tab.Navigator>
);

function AppContent() {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
      <StatusBar barStyle="dark-content" />
    </Provider>
  );
}
