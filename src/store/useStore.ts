import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from '../types';

interface StoreState {
  cart: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
  removeFromCart: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (product, variant, quantity) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.product.id === product.id && item.variant.id === variant.id
          );

          if (existingItem) {
            return {
              cart: state.cart.map((item) =>
                item.product.id === product.id && item.variant.id === variant.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { product, variant, quantity }],
          };
        });
      },

      removeFromCart: (productId, variantId) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.product.id === productId && item.variant.id === variantId)
          ),
        }));
      },

      updateQuantity: (productId, variantId, quantity) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item.product.id === productId && item.variant.id === variantId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ cart: [] });
      },

      cartTotal: () => {
        const state = get();
        return state.cart.reduce(
          (total, item) => total + item.variant.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
);

export default useStore;