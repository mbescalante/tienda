import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

interface User {
  id: number;
  email: string;
  name: string;
}

interface Order {
  id: number;
  date: string;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}

export const Profile = () => {
  const navigate = useNavigate();
  const { state } = useStore();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [wishlist, setWishlist] = useState(state.products.slice(0, 3));

  // Simulación de órdenes
  const [orders] = useState<Order[]>([
    {
      id: 1,
      date: '2024-03-15',
      total: 1299.99,
      status: 'completed',
      items: [
        {
          id: 2,
          name: 'Laptop Ultra Slim',
          price: 1299.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60',
        },
      ],
    },
    {
      id: 2,
      date: '2024-03-10',
      total: 499.98,
      status: 'pending',
      items: [
        {
          id: 3,
          name: 'Smartwatch Series 5',
          price: 299.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60',
        },
        {
          id: 4,
          name: 'Auriculares Inalámbricos',
          price: 199.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
        },
      ],
    },
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Mi Cuenta</h1>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Sidebar */}
            <div className="md:col-span-1 border-r border-gray-200">
              <nav className="p-4">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === 'profile'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Perfil
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === 'orders'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Mis Pedidos
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    activeTab === 'wishlist'
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  Lista de Deseos
                </button>
              </nav>
            </div>

            {/* Contenido */}
            <div className="md:col-span-3 p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Información Personal
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre
                        </label>
                        <input
                          type="text"
                          value={user.name}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Correo electrónico
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          readOnly
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Historial de Pedidos
                  </h2>
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <div className="p-4 bg-gray-50 border-b border-gray-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600">
                              Pedido #{order.id}
                            </p>
                            <p className="text-sm text-gray-600">
                              Fecha: {order.date}
                            </p>
                          </div>
                          <div>
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                order.status === 'completed'
                                  ? 'bg-green-100 text-green-800'
                                  : order.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {order.status === 'completed'
                                ? 'Completado'
                                : order.status === 'pending'
                                ? 'Pendiente'
                                : 'Cancelado'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center py-2"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="ml-4 flex-grow">
                              <h3 className="text-sm font-medium text-gray-900">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Cantidad: {item.quantity}
                              </p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">
                              ${item.price}
                            </p>
                          </div>
                        ))}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex justify-between">
                            <span className="font-medium text-gray-900">
                              Total
                            </span>
                            <span className="font-medium text-gray-900">
                              ${order.total}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Lista de Deseos
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((product) => (
                      <div
                        key={product.id}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {product.name}
                          </h3>
                          <p className="text-blue-600 font-bold mb-4">
                            ${product.price}
                          </p>
                          <button
                            onClick={() => {
                              setWishlist(wishlist.filter(p => p.id !== product.id));
                            }}
                            className="w-full text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Eliminar de la lista
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 