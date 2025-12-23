import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { productService } from '../../services/api';
import { addToCart } from '../../redux/slices/cartSlice';
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } from '../../redux/slices/productSlice';
import colors from '../../theme/colors';
import { formatPrice } from '../../utils/formatters';

const ProductListScreen = ({ route, navigation }) => {
  const { type, title } = route.params;
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantity, setQuantity] = useState({});

  useEffect(() => {
    loadProducts();
  }, [type]);

  const loadProducts = async () => {
    dispatch(fetchProductsRequest());
    let response;

    if (type === 'grocery') {
      response = await productService.getGroceryProducts();
    } else if (type === 'apartment') {
      response = await productService.getApartmentFood();
    }

    if (response.status === 200) {
      setProducts(response.data);
      dispatch(fetchProductsSuccess({ type, products: response.data }));
    } else {
      dispatch(fetchProductsFailure(response.error));
    }
  };

  const getCategories = () => {
    if (!products.length) return [];
    const categories = [...new Set(products.map((p) => p.category))];
    return ['all', ...categories];
  };

  const getFilteredProducts = () => {
    if (selectedCategory === 'all') {
      return products;
    }
    return products.filter((p) => p.category === selectedCategory);
  };

  const handleAddToCart = (product) => {
    const itemQuantity = parseInt(quantity[product.id] || '1', 10);
    if (itemQuantity < 1) {
      Alert.alert('Error', 'Please select at least 1 item');
      return;
    }

    dispatch(
      addToCart({
        product,
        quantity: itemQuantity,
        type,
      })
    );

    Alert.alert('Success', `${product.name} added to cart!`);
    setQuantity((prev) => ({ ...prev, [product.id]: '1' }));
  };

  const categories = getCategories();
  const filteredProducts = getFilteredProducts();

  if (loading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary.main} />
        <Text style={styles.loadingText}>Loading {title}...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={[styles.header, { backgroundColor: colors.primary.main }]}
      >
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>
          {filteredProducts.length} items available
        </Text>
      </View>

      {categories.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  selectedCategory === category && styles.categoryChipTextActive,
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onAddToCart={() => handleAddToCart(item)}
            quantity={quantity[item.id] || '1'}
            onQuantityChange={(qty) =>
              setQuantity((prev) => ({ ...prev, [item.id]: qty }))
            }
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyText}>No products found</Text>
          </View>
        }
        scrollEnabled={true}
      />
    </View>
  );
};

const ProductCard = ({ product, onAddToCart, quantity, onQuantityChange }) => {
  return (
    <View style={styles.productCard}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.productImage}
        />
        {product.rating && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {product.rating}</Text>
          </View>
        )}
      </View>

      <View style={styles.productContent}>
        <Text style={styles.productName}>{product.name}</Text>
        {product.seller && <Text style={styles.productSeller}>{product.seller}</Text>}
        {product.store && <Text style={styles.productStore}>{product.store}</Text>}

        <Text style={styles.productDescription}>{product.description}</Text>

        {product.prepareTime && (
          <View style={styles.prepareTimeContainer}>
            <Text style={styles.prepareTimeIcon}>⏱️</Text>
            <Text style={styles.prepareTime}>{product.prepareTime}</Text>
          </View>
        )}

        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>{formatPrice(product.price)}</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              onPress={() => {
                const newQty = Math.max(1, parseInt(quantity) - 1);
                onQuantityChange(newQty.toString());
              }}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => {
                const newQty = parseInt(quantity) + 1;
                onQuantityChange(newQty.toString());
              }}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={onAddToCart}>
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  categoryScroll: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  categoryContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    borderWidth: 1,
    borderColor: colors.gray[300],
  },
  categoryChipActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray[700],
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 12,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  productImageContainer: {
    position: 'relative',
    backgroundColor: colors.gray[100],
    height: 200,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  productContent: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gray[900],
    marginBottom: 4,
  },
  productSeller: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.secondary.main,
    marginBottom: 2,
  },
  productStore: {
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 13,
    color: colors.gray[700],
    lineHeight: 18,
    marginBottom: 8,
  },
  prepareTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  prepareTimeIcon: {
    fontSize: 14,
  },
  prepareTime: {
    fontSize: 12,
    color: colors.gray[600],
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary.main,
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
  addButton: {
    backgroundColor: colors.primary.main,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.gray[600],
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: colors.gray[600],
    fontWeight: '500',
  },
});

export default ProductListScreen;
