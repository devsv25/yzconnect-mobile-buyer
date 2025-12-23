import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../../redux/slices/cartSlice';
import { createOrderRequest, createOrderSuccess, createOrderFailure } from '../../redux/slices/orderSlice';
import { orderService } from '../../services/api';
import colors from '../../theme/colors';
import { formatPrice } from '../../utils/formatters';

const CartScreen = ({ route, navigation }) => {
  const type = route?.params?.type || 'grocery';
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart[type]);
  const { isLoading } = useSelector((state) => state.orders);

  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart({ productId, type }));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity, type }));
  };

  const handleCheckout = async () => {
    if (cart.items.length === 0) {
      Alert.alert('Empty Cart', 'Please add items before checking out');
      return;
    }

    dispatch(createOrderRequest());

    const deliveryInfo = {
      address: '123 Main St, Apt 4B',
      phone: '+1234567890',
      instructions: 'Leave at door',
    };

    const response = await orderService.createOrder(cart.items, deliveryInfo);

    if (response.status === 200) {
      dispatch(createOrderSuccess(response.data));
      dispatch(clearCart(type));
      Alert.alert('Order Placed', `Order #${response.data.id} confirmed!`, [
        {
          text: 'View Order',
          onPress: () => navigation.navigate('Orders'),
        },
        {
          text: 'Continue Shopping',
          onPress: () => navigation.navigate('Home'),
        },
      ]);
    } else {
      dispatch(createOrderFailure(response.error));
      Alert.alert('Error', response.error);
    }
  };

  if (cart.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🛒</Text>
        <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
        <Text style={styles.emptyText}>
          Start shopping to add items to your cart
        </Text>
        <TouchableOpacity
          style={styles.startShoppingButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.startShoppingText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const cartTitle = type === 'grocery' ? 'Grocery Cart' : 'ApartmentEats Cart';
  const deliveryFee = 49; // Rs. for India
  const taxRate = 0.05; // 5% tax for India
  const tax = Math.round(cart.totalPrice * taxRate);
  const total = cart.totalPrice + deliveryFee + tax;

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { backgroundColor: type === 'grocery' ? colors.primary.main : colors.secondary.main }]}
      >
        <Text style={styles.headerTitle}>{cartTitle}</Text>
        <Text style={styles.headerSubtitle}>{cart.totalItems} items</Text>
      </View>

      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => handleRemoveItem(item.product.id)}
            onUpdateQuantity={(quantity) =>
              handleUpdateQuantity(item.product.id, quantity)
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>{formatPrice(cart.totalPrice)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee:</Text>
          <Text style={styles.summaryValue}>{formatPrice(deliveryFee)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (5%):</Text>
          <Text style={styles.summaryValue}>{formatPrice(tax)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.checkoutButton, isLoading && styles.checkoutButtonDisabled]}
          onPress={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueShoppingButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.cartItemContent}>
        <View>
          <Text style={styles.itemName}>{item.product.name}</Text>
          {item.product.store && (
            <Text style={styles.itemStore}>{item.product.store}</Text>
          )}
          {item.product.prepareTime && (
            <Text style={styles.itemTime}>⏱️ {item.product.prepareTime}</Text>
          )}
        </View>
        <Text style={styles.itemPrice}>
          {formatPrice(item.product.price * item.quantity)}
        </Text>
      </View>

      <View style={styles.cartItemFooter}>
        <View style={styles.quantitySelector}>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => onUpdateQuantity(item.quantity + 1)}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  cartItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  cartItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  itemStore: {
    fontSize: 12,
    color: colors.secondary.main,
    fontWeight: '600',
    marginBottom: 2,
  },
  itemTime: {
    fontSize: 12,
    color: colors.gray[600],
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary.main,
  },
  cartItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 6,
    gap: 8,
  },
  quantityButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary.main,
  },
  quantityValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray[900],
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: colors.error + '15',
  },
  removeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.error,
  },
  summaryContainer: {
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    padding: 20,
    gap: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingTopHeight: 12,
    marginTopHeight: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary.main,
  },
  checkoutButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  checkoutButtonDisabled: {
    opacity: 0.6,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  continueshoppingButton: {
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary.main,
  },
  continueShoppingText: {
    color: colors.primary.main,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  startShoppingButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  startShoppingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default CartScreen;
