import { createBrowserRouter } from 'react-router-dom';
import { Products } from './components/Products';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Receipt } from './components/Receipt';
import { ProductDetail } from './components/ProductDetail';
import { Auth } from './components/Auth';
import { Profile } from './components/Profile';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'products/:id',
        element: <ProductDetail />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
      {
        path: 'receipt',
        element: <Receipt />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
]); 