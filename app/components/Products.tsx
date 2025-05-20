import { useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export const Products = () => {
  const { state, dispatch } = useStore();

  useEffect(() => {
    // Aquí normalmente haríamos una llamada a la API
    // Por ahora usaremos datos de ejemplo
    const mockProducts = [
      {
        id: 1,
        name: 'Producto 1',
        price: 99.99,
        description: 'Descripción del producto 1',
        image: 'https://via.placeholder.com/150',
      },
      {
        id: 2,
        name: 'Producto 2',
        price: 149.99,
        description: 'Descripción del producto 2',
        image: 'https://via.placeholder.com/150',
      },
    ];

    dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
  }, [dispatch]);

  const handleAddToCart = (product: typeof state.products[0]) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">{product.description}</p>
            <p className="text-xl font-bold mb-4">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}; 