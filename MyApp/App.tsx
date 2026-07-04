/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import { Product } from './src/types/Product';

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      {selectedProduct ? (
        <ProductDetailScreen
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <HomeScreen onProductSelect={setSelectedProduct} />
      )}
    </SafeAreaProvider>
  );
}

export default App;
