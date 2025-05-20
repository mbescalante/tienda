import { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';

export const Products = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Smartphone X Pro',
        price: 899.99,
        description: 'El último smartphone con cámara de alta resolución y procesador de última generación.',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60',
      },
      {
        id: 2,
        name: 'Laptop Ultra Slim',
        price: 1299.99,
        description: 'Laptop ultraligera con pantalla 4K y batería de larga duración.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60',
      },
      {
        id: 3,
        name: 'Smartwatch Series 5',
        price: 299.99,
        description: 'Reloj inteligente con monitor cardíaco y GPS integrado.',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60',
      },
      {
        id: 4,
        name: 'Auriculares Inalámbricos',
        price: 199.99,
        description: 'Auriculares con cancelación de ruido y sonido premium.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
      },
    ];

    dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
  }, [dispatch]);

  const handleAddToCart = (product: typeof state.products[0]) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Productos</h1>
        <p className="text-lg text-gray-600">Descubre nuestra selección de productos tecnológicos</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {state.products.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full">
                ${product.price}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  Agregar
                </button>
                <Link
                  to={`/products/${product.id}`}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Ver detalles
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 