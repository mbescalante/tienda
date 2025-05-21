import { useEffect, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Link } from 'react-router-dom';

export const Products = () => {
  const { state, dispatch } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name'>('name');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Smartphone X Pro',
        price: 899.99,
        description: 'El último smartphone con cámara de alta resolución y procesador de última generación.',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60',
        category: 'smartphones',
      },
      {
        id: 2,
        name: 'Laptop Ultra Slim',
        price: 1299.99,
        description: 'Laptop ultraligera con pantalla 4K y batería de larga duración.',
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&auto=format&fit=crop&q=60',
        category: 'laptops',
      },
      {
        id: 3,
        name: 'Smartwatch Series 5',
        price: 299.99,
        description: 'Reloj inteligente con monitor cardíaco y GPS integrado.',
        image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60',
        category: 'wearables',
      },
      {
        id: 4,
        name: 'Auriculares Inalámbricos',
        price: 199.99,
        description: 'Auriculares con cancelación de ruido y sonido premium.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60',
        category: 'audio',
      },
      {
        id: 5,
        name: 'Tablet Pro 10',
        price: 459.99,
        description: 'Tablet de 10 pulgadas ideal para trabajo y entretenimiento.',
        image: 'https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/MSFT-Surface-Pro-10-sneak-carousel-pivot-5?scl=1',
        category: 'tablets',
      },
      {
        id: 6,
        name: 'Monitor Curvo Gamer',
        price: 349.99,
        description: 'Monitor de alta frecuencia de actualización para una experiencia inmersiva.',
        image: 'https://img.global.news.samsung.com/latin/wp-content/uploads/2020/06/Odyssey-G9_4.jpg',
        category: 'monitors',
      },
      {
        id: 7,
        name: 'Teclado Mecánico RGB',
        price: 129.99,
        description: 'Teclado con interruptores mecánicos y retroiluminación personalizable.',
        image: 'https://media.steelseriescdn.com/thumbs/catalog/items/64829/477db1dbde3443e6b4a7584a36709c4b.png.1400x1120_q100_crop-fit_optimize.png',
        category: 'accessories',
      },
      {
        id: 8,
        name: 'Mouse Inalámbrico Ergonómico',
        price: 49.99,
        description: 'Mouse cómodo y preciso para largas horas de uso.',
        image: 'https://coolboxpe.vtexassets.com/arquivos/ids/183771/2604736_1.jpg?v=637540915674630000',
        category: 'accessories',
      },
      {
        id: 9,
        name: 'Webcam Full HD',
        price: 79.99,
        description: 'Webcam de alta definición ideal para videollamadas y streaming.',
        image: 'https://www.achorao.com/cdn/shop/files/logitech-computo-default-title-webcam-logitech-streamcam-plus-1080p-60fps-097855153210-46364049768688.jpg?v=1738876036',
        category: 'accessories',
      },
      {
        id: 10,
        name: 'Router Wi-Fi 6',
        price: 159.99,
        description: 'Router de última generación con alta velocidad y cobertura.',
        image: 'https://i.blogs.es/c04991/img-4/450_1000.jpeg',
        category: 'network',
      },
    ];

    dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
  }, [dispatch]);

  const handleAddToCart = (product: typeof state.products[0]) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const filteredProducts = state.products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nuestros Productos</h1>
        <p className="text-lg text-gray-600">Descubre nuestra selección de productos tecnológicos</p>
      </div>

      <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg
            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="name">Ordenar por nombre</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
          </select>
        </div>
        <div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Precio:</span>
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full"
            />
            <span className="text-gray-600">${priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
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
              <div className="absolute top-0 left-0 bg-gray-800 text-white px-3 py-1 m-2 rounded-full text-sm">
                {product.category}
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