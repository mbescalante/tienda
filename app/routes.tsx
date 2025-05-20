import { createBrowserRouter } from 'react-router-dom';
import Root from './root';
import { Products } from './components/Products';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
      },
    ],
  },
]); 