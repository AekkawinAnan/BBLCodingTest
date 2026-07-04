import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Product } from '../types/Product';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
}

function ProductDetailScreen({ product, onBack }: ProductDetailScreenProps) {
  const renderStars = (rate: number) => {
    const fullStars = Math.round(rate);
    return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.productImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.infoSection}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{product.category}</Text>
          </View>

          <Text style={styles.title}>{product.title}</Text>

          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          <View style={styles.ratingRow}>
            <Text style={styles.stars}>{renderStars(product.rating.rate)}</Text>
            <Text style={styles.ratingText}>
              {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
            </Text>
          </View>

          <View style={styles.divider} />

          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 22,
    color: '#4f46e5',
    marginRight: 6,
  },
  backText: {
    fontSize: 17,
    color: '#4f46e5',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 40,
    backgroundColor: '#fafafa',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  infoSection: {
    padding: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#eef2ff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#4f46e5',
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    lineHeight: 30,
    marginBottom: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#4f46e5',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    fontSize: 18,
    color: '#f59e0b',
    letterSpacing: 2,
  },
  ratingText: {
    fontSize: 14,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 20,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24,
  },
});

export default ProductDetailScreen;