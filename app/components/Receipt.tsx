import { useStore, type CartItem, type Coupon } from '../context/StoreContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface ReceiptData {
  orderNumber: string;
  date: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customerInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
  paymentMethod: {
    type: string;
    last4: string;
  };
  status: 'processing' | 'shipped' | 'delivered';
  estimatedDelivery: string;
}

export const Receipt = () => {
  const { state, dispatch } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  useEffect(() => {
    // Leer los items comprados y el cupón del estado de la ruta
    const { purchasedItems, appliedCoupon } = location.state as { purchasedItems: CartItem[], appliedCoupon: Coupon | null };

    // Si no hay items comprados en el estado de la ruta (ej: acceso directo a /receipt), redirigir a productos
    if (!purchasedItems || purchasedItems.length === 0) {
        navigate('/products');
        return;
    }

    // Generar número de orden más profesional
    const generateOrderNumber = () => {
      const date = new Date();
      const year = date.getFullYear().toString().slice(-2);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      return `TS-${year}${month}${day}-${random}`;
    };

    // Obtener datos del usuario del localStorage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const orderNumber = generateOrderNumber();
    const currentDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Calcular fechas de entrega
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3 + Math.floor(Math.random() * 3));
    const estimatedDelivery = deliveryDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Calcular subtotal, descuento y total usando los items comprados y el cupón del estado de ruta
    const subtotal = purchasedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const discount = appliedCoupon
      ? appliedCoupon.type === 'percentage'
        ? (subtotal * appliedCoupon.discount) / 100
        : appliedCoupon.discount
      : 0;

    const shipping = appliedCoupon?.code === 'FREESHIP' ? 0 : 15;
    const total = subtotal - discount + shipping;

    // Simular estado aleatorio de la orden
    const statuses: Array<'processing' | 'shipped' | 'delivered'> = ['processing', 'shipped', 'delivered'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    setReceiptData({
      orderNumber,
      date: currentDate,
      items: purchasedItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal,
      discount,
      shipping,
      total,
      customerInfo: {
        name: user.name || 'Cliente',
        email: user.email || 'cliente@ejemplo.com',
        address: user.address || 'Dirección de entrega',
        city: user.city || 'Ciudad',
        zipCode: user.zipCode || 'Código Postal'
      },
      paymentMethod: {
        type: 'Tarjeta de crédito',
        last4: '**** **** **** ' + Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      },
      status: randomStatus,
      estimatedDelivery
    });

  }, [location.state, navigate]);

  if (!receiptData) {
    return <div>Cargando boleta...</div>;
  }

  const handlePrint = () => {
    window.print();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return 'En proceso';
      case 'shipped':
        return 'Enviado';
      case 'delivered':
        return 'Entregado';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Encabezado de la Boleta */}
        <div className="text-center mb-8 border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">TechStore</h1>
          <p className="text-gray-600 mb-4">Boleta de Compra</p>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              <p>Fecha: {receiptData.date}</p>
              <p>N° Orden: {receiptData.orderNumber}</p>
            </div>
            <div className="text-right">
              <p>Estado: <span className={`font-medium ${getStatusColor(receiptData.status)}`}>{getStatusText(receiptData.status)}</span></p>
              <p>Entrega estimada: {receiptData.estimatedDelivery}</p>
            </div>
          </div>
        </div>

        {/* Información del Cliente */}
        <div className="mb-8 border-b pb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Datos del Cliente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Nombre:</span> {receiptData.customerInfo.name}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {receiptData.customerInfo.email}
              </p>
            </div>
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Dirección:</span> {receiptData.customerInfo.address}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Ciudad:</span> {receiptData.customerInfo.city}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Código Postal:</span> {receiptData.customerInfo.zipCode}
              </p>
            </div>
          </div>
        </div>

        {/* Productos */}
        <div className="mb-8 border-b pb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Productos Comprados</h2>
          <div className="space-y-4">
            {receiptData.items.map((item) => (
              <div key={item.id} className="flex items-center bg-gray-50 p-4 rounded-lg">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="ml-4 flex-grow">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <div className="mt-2 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">
                        <span className="font-medium">Cantidad:</span> {item.quantity}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Precio unitario:</span> ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen de Pagos */}
        <div className="mb-8 border-b pb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Pagos</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal ({receiptData.items.reduce((sum, item) => sum + item.quantity, 0)} productos)</span>
                <span className="text-lg font-medium">${receiptData.subtotal.toFixed(2)}</span>
              </div>
              {receiptData.discount > 0 && (
                <div className="flex justify-between items-center text-green-600">
                  <span>Descuento</span>
                  <span className="text-lg font-medium">-${receiptData.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Envío</span>
                <span className="text-lg font-medium">
                  {receiptData.shipping === 0 ? 'Gratis' : `$${receiptData.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold text-gray-900">Total a Pagar</span>
                  <span className="text-2xl font-bold text-gray-900">${receiptData.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Información de Pago */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Información de Pago</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">
              <span className="font-medium">Método de Pago:</span> {receiptData.paymentMethod.type}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Tarjeta:</span> {receiptData.paymentMethod.last4}
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Imprimir Boleta
          </button>
          <Link
            to="/products"
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
}; 