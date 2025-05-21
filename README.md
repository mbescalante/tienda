# TechStore

## Descripción del Proyecto

TechStore es una aplicación de comercio electrónico construida con React, diseñada para simular un proceso de compra online. La aplicación incluye funcionalidades clave como visualización de productos, gestión del carrito de compras, un proceso de checkout simulado y la generación de una boleta de compra.

## Características Principales

*   **Catálogo de Productos**: Visualización de una lista de productos tecnológicos con opciones de filtrado y ordenamiento.
*   **Carrito de Compras**: Añadir, actualizar cantidad y eliminar productos del carrito, con persistencia en localStorage.
*   **Cupones de Descuento**: Aplicación de cupones con descuentos porcentuales o fijos.
*   **Checkout**: Proceso de pago simulado con validación de formulario y resumen del pedido.
*   **Boleta de Compra**: Generación de una boleta detallada con número de orden, información del cliente, productos comprados y resumen de pago.
*   **Autenticación (Básica)**: Funcionalidad simulada de registro y login de usuarios.
*   **Perfil de Usuario**: Página de perfil con historial de compras simulado y wishlist.
*   **Gestión de Estado**: Uso de Context API para la gestión global del estado del carrito y productos.
*   **Rutas**: Configuración de navegación utilizando React Router.
*   **Diseño Responsivo**: Interfaz adaptable a diferentes tamaños de pantalla utilizando Tailwind CSS.

## Tecnologías Utilizadas

*   React
*   React Router v6/v7
*   Context API
*   Tailwind CSS
*   Vite

## Instalación y Configuración

1.  Clona el repositorio:

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2.  Navega al directorio del proyecto:

    ```bash
    cd tienda
    ```

3.  Instala las dependencias:

    ```bash
    npm install
    # o yarn install
    # o pnpm install
    ```

## Uso

Para iniciar la aplicación en modo desarrollo:

```bash
npm run dev
# o yarn dev
# o pnpm dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que indique Vite).

Para simular una compra:

1.  Navega a la página de Productos.
2.  Añade productos al carrito.
3.  Ve a la página del Carrito.
4.  (Opcional) Aplica un cupón de descuento.
5.  Proceder al pago.
6.  Completa la información de envío y pago (datos simulados, no se procesa pago real).
7.  Confirma el pago.
8.  Serás redirigido a la página de Boleta con los detalles de tu compra.

## Estructura del Proyecto

```
├── public/
├── src/
│   ├── assets/        # Archivos estáticos (imágenes, etc.)
│   ├── components/    # Componentes reutilizables (Botones, Cards, etc.)
│   ├── context/       # Contextos de React (StoreContext)
│   ├── pages/         # Posibles páginas de la aplicación (si se usara una estructura de pages)
│   ├── routes/        # Definición de rutas (routes.tsx)
│   ├── App.tsx        # Componente principal (aunque ahora el Layout es el envoltorio)
│   ├── main.tsx       # Punto de entrada de la aplicación
│   └── index.css      # Estilos globales
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
└── vite.config.ts
```

## Copyright

© {new Date().getFullYear()} TechStore. Todos los derechos reservados. Milton Bruno Escalantre Mattos.
