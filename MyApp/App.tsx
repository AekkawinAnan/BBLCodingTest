/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FavoritesProvider } from './src/context/FavoritesContext';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetailScreen from './src/screens/ProductDetailScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import { Product } from './src/types/Product';

type Screen = 'home' | 'detail' | 'favorites';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const navigateToDetail = (product: Product) => {
    setSelectedProduct(product);
    setCurrentScreen('detail');
  };

  const navigateToFavorites = () => {
    setCurrentScreen('favorites');
  };

  const navigateToHome = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'detail':
        return selectedProduct ? (
          <ProductDetailScreen
            product={selectedProduct}
            onBack={navigateToHome}
          />
        ) : null;
      case 'favorites':
        return (
          <FavoritesScreen
            onProductSelect={navigateToDetail}
            onBack={navigateToHome}
          />
        );
      case 'home':
      default:
        return (
          <HomeScreen
            onProductSelect={navigateToDetail}
            onGoToFavorites={navigateToFavorites}
          />
        );
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <FavoritesProvider>{renderScreen()}</FavoritesProvider>
    </SafeAreaProvider>
  );
}

export default App;
