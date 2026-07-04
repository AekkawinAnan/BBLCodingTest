import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/Product';

interface FavoritesContextValue {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorite: () => false,
});

const FAVORITES_STORAGE_KEY = 'favorites';

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFavorites = async () => {
      try {
        await AsyncStorage.setItem('__favorites_storage_test__', '1');
        await AsyncStorage.removeItem('__favorites_storage_test__');
      } catch {
        if (isMounted) {
          setStorageAvailable(false);
        }
      }

      try {
        if (!isMounted) {
          return;
        }

        if (!storageAvailable) {
          return;
        }

        const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);

        if (isMounted && storedFavorites) {
          setFavorites(JSON.parse(storedFavorites) as Product[]);
        }
      } catch (error) {
        console.warn('Failed to load favorites', error);
      } finally {
        if (isMounted) {
          setIsReady(true);
        }
      }
    };

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [storageAvailable]);

  useEffect(() => {
    if (!isReady || !storageAvailable) {
      return;
    }

    const persistFavorites = async () => {
      try {
        await AsyncStorage.setItem(
          FAVORITES_STORAGE_KEY,
          JSON.stringify(favorites),
        );
      } catch (error) {
        console.warn('Failed to save favorites', error);
      }
    };

    persistFavorites();
  }, [favorites, isReady, storageAvailable]);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const isFavorite = useCallback(
    (productId: number) => favorites.some((p) => p.id === productId),
    [favorites],
  );

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites, toggleFavorite, isFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}