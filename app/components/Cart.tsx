import { useStore, type CartItem } from '../context/StoreContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
}

const AVAILABLE_COUPONS: Coupon[] = [
  { code: 'WELCOME10', discount: 10, type: 'percentage' },
  { code: 'SUMMER20', discount: 20, type: 'percentage' },
  { code: 'FREESHIP', discount: 15, type: 'fixed' },
];

export const Cart = () => {
  const { state, dispatch } = useStore();
  const [removingItemId, setRemovingItemId] = useState<number | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState<Date | null>(null);

  useEffect(() => {
    // Cargar carrito desde localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart: CartItem[] = JSON.parse(savedCart);
        // Usar SET_CART para reemplazar el estado del carrito con los datos guardados
        dispatch({ type: 'SET_CART', payload: parsedCart });
      } catch (e) {
        console.error("Error loading cart from localStorage:", e);
        // Opcional: Limpiar localStorage si los datos son inválidos
        localStorage.removeItem('cart');
      }
    }

    // Calcular fecha estimada de entrega (3-5 días hábiles)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3 + Math.floor(Math.random() * 3));
    setEstimatedDelivery(deliveryDate);
    
    // Limpiar el efecto si el componente se desmonta
    return () => {
      // Puedes añadir lógica de limpieza si es necesaria, aunque para este efecto no es crucial
    };

  }, [dispatch]); // dispatch es una dependencia estable proporcionada por useReducer

  useEffect(() => {
    // Guardar carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(state.cart));
  }, [state.cart]);

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleRemoveItem = (id: number) => {
    setRemovingItemId(id);
    setTimeout(() => {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
      setRemovingItemId(null);
    }, 300);
  };

  const handleApplyCoupon = () => {
    setCouponError('');
    const coupon = AVAILABLE_COUPONS.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      dispatch({ type: 'APPLY_COUPON', payload: coupon });
      setCouponCode('');
    } else {
      setCouponError('Cupón no válido');
    }
  };

  const handleRemoveCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' });
  };

  const subtotal = state.cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discount = state.appliedCoupon
    ? state.appliedCoupon.type === 'percentage'
      ? (subtotal * state.appliedCoupon.discount) / 100
      : state.appliedCoupon.discount
    : 0;

  const shipping = state.appliedCoupon?.code === 'FREESHIP' ? 0 : 15;

  const total = subtotal - discount + shipping;

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-md mx-auto">
          <svg
            className="w-24 h-24 mx-auto text-gray-400 mb-6"
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">
            Parece que aún no has agregado productos a tu carrito.
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Carrito de Compras</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {state.cart.map((item) => (
              <div
                key={item.id}
                className={`flex items-center p-6 border-b last:border-b-0 transition-all duration-300 ${
                  removingItemId === item.id ? 'opacity-0 transform translate-x-full' : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-6 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="mx-4 text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="ml-6">
                  <p className="text-lg font-semibold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-800 mt-2 transition-colors flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen del pedido</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {/* Cupón de descuento */}
              <div className="border-t pt-4">
                {state.appliedCoupon ? (
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-green-600 font-medium">
                        Cupón aplicado: {state.appliedCoupon.code}
                      </span>
                      <p className="text-sm text-gray-600">
                        {state.appliedCoupon.type === 'percentage'
                          ? `${state.appliedCoupon.discount}% de descuento`
                          : `$${state.appliedCoupon.discount} de descuento`}
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Eliminar
                    </button>
                  </div>
                ) : (
                  <div className="mb-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Código de cupón"
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Aplicar
                      </button>
                    </div>
                    {couponError && (
                      <p className="mt-1 text-sm text-red-600">{couponError}</p>
                    )}
                  </div>
                )}
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Descuento</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
              </div>

              {estimatedDelivery && (
                <div className="text-sm text-gray-600">
                  Entrega estimada: {estimatedDelivery.toLocaleDateString()}
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors"
            >
              Proceder al pago
            </Link>
            <Link
              to="/products"
              className="block w-full text-center py-3 mt-4 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}; 