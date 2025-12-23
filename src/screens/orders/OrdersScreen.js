import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersFailure } from '../../redux/slices/orderSlice';
import { orderService } from '../../services/api';
import colors from '../../theme/colors';

const OrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.orders);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    dispatch(fetchOrdersRequest());
    const response = await orderService.getOrders('user_123');

    if (response.status === 200) {
      dispatch(fetchOrdersSuccess(response.data));
    } else {
      dispatch(fetchOrdersFailure(response.error));
      Alert.alert('Error', response.error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const handleTrackOrder = async (orderId) => {
    const response = await orderService.trackOrder(orderId);
    if (response.status === 200) {
      Alert.alert(
        'Order Tracking',
        `Status: ${response.data.status}\nLocation: ${response.data.currentLocation}\nEstimated Arrival: ${new Date(response.data.estimatedArrival).toLocaleTimeString()}`
      );
    }
  };

  if (loading && orders.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Loading your orders...</Text>
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>📦</Text>
        <Text style={styles.emptyTitle}>No Orders Yet</Text>
        <Text style={styles.emptyText}>
          Start shopping to place your first order
        </Text>
        <TouchableOpacity
          style={styles.startShoppingButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.startShoppingText}>Shop Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { backgroundColor: colors.primary.main }]}
      >
        <Text style={styles.headerTitle}>Your Orders</Text>
        <Text style={styles.headerSubtitle}>
          {orders.length} order{orders.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onTrack={() => handleTrackOrder(item.id)}
            onReorder={() => navigation.navigate('Home')}
          />
        )}
        contentContainerStyle={styles.listContent}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        scrollEnabled={true}
      />
    </View>
  );
};

const OrderCard = ({ order, onTrack, onReorder }) => {
  const statusColors = {
    confirmed: colors.info,
    'in-transit': colors.warning,
    delivered: colors.success,
    cancelled: colors.error,
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return '✓';
      case 'in-transit':
        return '🚚';
      case 'delivered':
        return '✓✓';
      case 'cancelled':
        return '✕';
      default:
        return '•';
    }
  };

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <View>
          <Text style={styles.orderId}>Order #{order.id.replace('order_', '')}</Text>
          <Text style={styles.orderDate}>
            {new Date(order.createdAt).toLocaleDateString()}
          </Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColors[order.status] + '20' },
          ]}
        >
          <Text
            style={[
              styles.statusIcon,
              { color: statusColors[order.status] },
            ]}
          >
            {getStatusIcon(order.status)}
          </Text>
          <Text
            style={[
              styles.statusText,
              { color: statusColors[order.status] },
            ]}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={styles.orderItems}>
        {order.items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>
              {item.product.name} x{item.quantity}
            </Text>
            <Text style={styles.itemPrice}>
              ${(item.product.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>${order.totalPrice.toFixed(2)}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.trackButton} onPress={onTrack}>
            <Text style={styles.trackButtonText}>Track</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.reorderButton} onPress={onReorder}>
            <Text style={styles.reorderButtonText}>Reorder</Text>
          </TouchableOpacity>
        </View>
      </View>

      {order.estimatedDelivery && (
        <View style={styles.estimatedDelivery}>
          <Text style={styles.estimatedDeliveryIcon}>📅</Text>
          <Text style={styles.estimatedDeliveryText}>
            Estimated: {new Date(order.estimatedDelivery).toLocaleString()}
          </Text>
        </View>
      )}
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
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusIcon: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderItems: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 13,
    color: colors.text.primary,
    fontWeight: '500',
    flex: 1,
  },
  itemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary.main,
  },
  orderFooter: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary.main,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  trackButton: {
    flex: 1,
    backgroundColor: colors.primary.main,
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  reorderButton: {
    flex: 1,
    backgroundColor: colors.gray[200],
    borderRadius: 6,
    paddingVertical: 10,
    alignItems: 'center',
  },
  reorderButtonText: {
    color: colors.text.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  estimatedDelivery: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  estimatedDeliveryIcon: {
    fontSize: 16,
  },
  estimatedDeliveryText: {
    fontSize: 12,
    color: colors.text.secondary,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.text.secondary,
  },
});

export default OrdersScreen;
