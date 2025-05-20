import { createContext, useContext, useReducer, type ReactNode } from 'react';

// Tipos
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

interface StoreState {
  products: Product[];
  cart: CartItem[];
  appliedCoupon: Coupon | null;
}

// Estado inicial
const initialState: StoreState = {
  products: [
    {
      id: 1,
      name: 'Laptop Ultra Slim',
      price: 1299.99,
      description: 'Laptop ultradelgada con procesador de última generación y pantalla 4K.',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60',
      category: 'Laptops'
    },
    {
      id: 2,
      name: 'Smartphone Pro',
      price: 899.99,
      description: 'Smartphone con cámara de alta resolución y batería de larga duración.',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60',
      category: 'Smartphones'
    },
    {
      id: 3,
      name: 'Smartwatch Series 5',
      price: 299.99,
      description: 'Reloj inteligente con monitor de ritmo cardíaco y GPS integrado.',
      image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60',
      category: 'Wearables'
    },
    {
      id: 4,
      name: 'Auriculares Inalámbricos',
      price: 199.99,
      description: 'Auriculares con cancelación de ruido y sonido envolvente.',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
      category: 'Audio'
    }
  ],
  cart: [],
  appliedCoupon: null
};

// Acciones
type StoreAction =
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON'; payload: Coupon }
  | { type: 'REMOVE_COUPON' }
  | { type: 'SET_CART'; payload: CartItem[] };

// Reducer
const storeReducer = (state: StoreState, action: StoreAction): StoreState => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
      };
    case 'APPLY_COUPON':
      return {
        ...state,
        appliedCoupon: action.payload,
      };
    case 'REMOVE_COUPON':
      return {
        ...state,
        appliedCoupon: null,
      };
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

// Contexto
interface StoreContextType {
  state: StoreState;
  dispatch: React.Dispatch<StoreAction>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Provider
export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

// Hook personalizado
export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore debe ser usado dentro de un StoreProvider');
  }
  return context;
}; 