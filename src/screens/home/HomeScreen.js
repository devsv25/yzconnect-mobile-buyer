import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import colors from '../../theme/colors';
import { formatPrice } from '../../utils/formatters';

const HomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const { grocery, apartment } = useSelector((state) => state.cart);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View
        style={[styles.header, { backgroundColor: colors.primary.main }]}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={styles.userName}>{user?.name || 'Buyer'}</Text>
          </View>
          <View style={styles.cartSummary}>
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeLabel}>Total Items</Text>
              <Text style={styles.cartBadgeValue}>{grocery.totalItems + apartment.totalItems}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        <View style={styles.optionWrapper}>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => navigation.navigate('GroceryShopping')}
            activeOpacity={0.85}
          >
            <View
              style={[styles.optionGradient, { backgroundColor: colors.primary.main }]}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionEmoji}>🛒</Text>
                <Text style={styles.optionTitle}>Shop Grocery</Text>
                <Text style={styles.optionSubtitle}>Buy from local stores</Text>
                <Text style={styles.optionDescription}>
                  Fresh vegetables, fruits, dairy & more from neighborhood shops
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {grocery.totalItems > 0 && (
            <View style={styles.cartInfoBar}>
              <View style={styles.cartInfo}>
                <Text style={styles.cartInfoText}>
                  {grocery.totalItems} item{grocery.totalItems !== 1 ? 's' : ''} • {formatPrice(grocery.totalPrice)}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.viewCartButton}
                onPress={() => navigation.navigate('Cart', { type: 'grocery' })}
                activeOpacity={0.7}
              >
                <Text style={styles.viewCartButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.optionWrapper}>
          <TouchableOpacity
            style={styles.optionCard}
            onPress={() => navigation.navigate('ApartmentFood')}
            activeOpacity={0.85}
          >
            <View
              style={[styles.optionGradient, { backgroundColor: colors.secondary.main }]}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionEmoji}>🍜</Text>
                <Text style={styles.optionTitle}>ApartmentEats</Text>
                <Text style={styles.optionSubtitle}>Food from neighbors</Text>
                <Text style={styles.optionDescription}>
                  Homemade food, snacks & desserts prepared by apartment dwellers
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          {apartment.totalItems > 0 && (
            <View style={[styles.cartInfoBar, { backgroundColor: '#FFF3E0' }]}>
              <View style={styles.cartInfo}>
                <Text style={styles.cartInfoText}>
                  {apartment.totalItems} item{apartment.totalItems !== 1 ? 's' : ''} • {formatPrice(apartment.totalPrice)}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.viewCartButton, { backgroundColor: colors.secondary.main }]}
                onPress={() => navigation.navigate('Cart', { type: 'apartment' })}
                activeOpacity={0.7}
              >
                <Text style={styles.viewCartButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose YzConnect?</Text>
        <View style={styles.featuresList}>
          <FeatureItem icon="✓" title="Local Support" description="Support neighborhood sellers" />
          <FeatureItem title="Fresh Products" description="Daily fresh grocery & homemade food" />
          <FeatureItem title="Fair Prices" description="Direct from sellers, no middlemen" />
          <FeatureItem title="Fast Delivery" description="Quick delivery to your doorstep" />
        </View>
      </View>
    </ScrollView>
  );
};

const FeatureItem = ({ icon, title, description }) => (
  <View style={styles.featureItem}>
    <View style={styles.featureIcon}>
      <Text style={styles.featureIconText}>{icon || '✓'}</Text>
    </View>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 4,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  cartSummary: {
    alignItems: 'flex-end',
  },
  cartBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  cartBadgeLabel: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '600',
  },
  cartBadgeValue: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    marginTop: 2,
  },
  optionsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 16,
  },
  optionWrapper: {
    marginBottom: 8,
  },
  optionCard: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  optionGradient: {
    padding: 24,
    minHeight: 180,
    justifyContent: 'center',
  },
  optionContent: {
    alignItems: 'center',
  },
  optionEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 12,
    fontWeight: '500',
  },
  optionDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    lineHeight: 18,
  },
  cartInfoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    marginTop: -4,
  },
  cartInfo: {
    flex: 1,
  },
  cartInfoText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary.main,
  },
  viewCartButton: {
    backgroundColor: colors.primary.main,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  viewCartButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },
  featuresSection: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.light,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureIconText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary.main,
  },
  featureContent: {
    flex: 1,
    justifyContent: 'center',
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray[900],
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 12,
    color: colors.gray[600],
  },
});

export default HomeScreen;
