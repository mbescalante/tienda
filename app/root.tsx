import { Link, Outlet } from 'react-router-dom';
import { useStore } from './context/StoreContext';

export default function Root() {
  const { state } = useStore();
  const cartItemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              Mi Tienda
            </Link>
            <div className="flex items-center space-x-8">
              <Link
                to="/products"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Productos
              </Link>
              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre Nosotros</h3>
              <p className="text-gray-600">
                Tu tienda online de confianza para encontrar los mejores productos al mejor precio.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enlaces Rápidos</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Productos
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Carrito
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacto</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Email: info@mitienda.com</li>
                <li>Teléfono: (123) 456-7890</li>
                <li>Dirección: Calle Principal 123</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Mi Tienda. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
