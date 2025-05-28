# API REST de E-commerce de Zapatillas con Prisma y PostgreSQL

## Características Principales

- **API REST** todos los endpoints CRUD
- **Autenticación JWT** con roles de usuario (ADMIN/CLIENT)
- **Relaciones entre entidades** - Todas las consultas incluyen datos relacionados
- **Paginación** en todos los listados
- **Validación de datos** con middleware personalizado
- **Base de datos PostgreSQL** con Docker
- **ORM Prisma** para manejo de datos
- **TypeScript** para tipado
- **Arquitectura en capas** (Controllers, Services, Models)

## Requisitos previos

- Node.js (v14 o +)
- Docker y Docker Compose
- npm o yarn

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias:
```bash
npm install
```

3. Crear un archivo `.env` en la raíz del proyecto con la siguiente configuración:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=db_ecommerce_prisma_node
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/db_ecommerce_prisma_node"
JWT_SECRET=tu_jwt_secret_aqui
```

4. Iniciar la base de datos PostgreSQL con Docker:
```bash
docker compose up -d
```

5. Generar el cliente Prisma y aplicar las migraciones:
```bash
npm run prisma:generate
npm run prisma:migrate
```

## ▶Ejecución

Para iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

**Prisma Studio** (Interfaz visual de la BD) ejecutar este comando:
```bash
npx prisma studio
```
- Prisma Studio: http://localhost:5555/ <- Acceder a este link para ver la BBDD
- API URL: http://localhost:9000 <- Health endpoint

## Endpoints de la API

### Autenticación - Estos endpoints no estan protegidos - 
- **POST /api/v1/auth/register**: Registrar nuevo usuario
- **POST /api/v1/auth/login**: Iniciar sesión

### Usuarios
- **GET /api/v1/users**: Obtener todos los usuarios (con direcciones y órdenes)
- **GET /api/v1/users/:id**: Obtener usuario por ID
- **POST /api/v1/users**: Crear nuevo usuario
- **PUT /api/v1/users/:id**: Actualizar usuario
- **DELETE /api/v1/users/:id**: Eliminar usuario

### Productos
- **GET /api/v1/products**: Obtener todos los productos (con marca, categoría, color, imágenes, tallas)
- **GET /api/v1/products/:id**: Obtener producto por ID
- **POST /api/v1/products**: Crear nuevo producto
- **PUT /api/v1/products/:id**: Actualizar producto
- **DELETE /api/v1/products/:id**: Eliminar producto

### Marcas
- **GET /api/v1/brands**: Obtener todas las marcas (con productos)
- **GET /api/v1/brands/:id**: Obtener marca por ID
- **POST /api/v1/brands**: Crear nueva marca
- **PUT /api/v1/brands/:id**: Actualizar marca
- **DELETE /api/v1/brands/:id**: Eliminar marca

### Categorías
- **GET /api/v1/categories**: Obtener todas las categorías (con tipo y productos)
- **GET /api/v1/categories/:id**: Obtener categoría por ID
- **POST /api/v1/categories**: Crear nueva categoría
- **PUT /api/v1/categories/:id**: Actualizar categoría
- **DELETE /api/v1/categories/:id**: Eliminar categoría

### Colores
- **GET /api/v1/colours**: Obtener todos los colores (con productos)
- **GET /api/v1/colours/:id**: Obtener color por ID
- **POST /api/v1/colours**: Crear nuevo color
- **PUT /api/v1/colours/:id**: Actualizar color
- **DELETE /api/v1/colours/:id**: Eliminar color

### Talles
- **GET /api/v1/sizes**: Obtener todas las tallas (con productos)
- **GET /api/v1/sizes/:id**: Obtener talla por ID
- **POST /api/v1/sizes**: Crear nueva talla
- **PUT /api/v1/sizes/:id**: Actualizar talla
- **DELETE /api/v1/sizes/:id**: Eliminar talla

### Imágenes de Productos
- **GET /api/v1/product-images**: Obtener todas las imágenes (con producto)
- **GET /api/v1/product-images/:id**: Obtener imagen por ID
- **POST /api/v1/product-images**: Crear nueva imagen
- **PUT /api/v1/product-images/:id**: Actualizar imagen
- **DELETE /api/v1/product-images/:id**: Eliminar imagen

### Talles de Productos (Relación M:N)
- **GET /api/v1/product-sizes**: Obtener todas las relaciones producto-talle
- **GET /api/v1/product-sizes/:id**: Obtener relación por ID
- **POST /api/v1/product-sizes**: Asociar talla a producto
- **PUT /api/v1/product-sizes/:id**: Actualizar relación
- **DELETE /api/v1/product-sizes/:id**: Eliminar relación

### Órdenes de Compra
- **GET /api/v1/purchase-orders**: Obtener todas las órdenes (con detalles y usuario)
- **GET /api/v1/purchase-orders/:id**: Obtener orden por ID
- **POST /api/v1/purchase-orders**: Crear nueva orden
- **PUT /api/v1/purchase-orders/:id**: Actualizar orden
- **DELETE /api/v1/purchase-orders/:id**: Eliminar orden

### Detalles de Orden
- **GET /api/v1/details**: Obtener todos los detalles (con producto y orden)
- **GET /api/v1/details/:id**: Obtener detalle por ID
- **POST /api/v1/details**: Crear nuevo detalle
- **PUT /api/v1/details/:id**: Actualizar detalle
- **DELETE /api/v1/details/:id**: Eliminar detalle

### Direcciones
- **GET /api/v1/addresses**: Obtener todas las direcciones (con usuarios)
- **GET /api/v1/addresses/:id**: Obtener dirección por ID
- **POST /api/v1/addresses**: Crear nueva dirección
- **PUT /api/v1/addresses/:id**: Actualizar dirección
- **DELETE /api/v1/addresses/:id**: Eliminar dirección

### Descuentos
- **GET /api/v1/discounts**: Obtener todos los descuentos (con productos)
- **GET /api/v1/discounts/:id**: Obtener descuento por ID
- **POST /api/v1/discounts**: Crear nuevo descuento
- **PUT /api/v1/discounts/:id**: Actualizar descuento
- **DELETE /api/v1/discounts/:id**: Eliminar descuento

### Tipos de Categoría
- **GET /api/v1/types**: Obtener todos los tipos (con categorías)
- **GET /api/v1/types/:id**: Obtener tipo por ID
- **POST /api/v1/types**: Crear nuevo tipo
- **PUT /api/v1/types/:id**: Actualizar tipo
- **DELETE /api/v1/types/:id**: Eliminar tipo

## Características Especiales

### Relaciones Automáticas
Todas las consultas incluyen automáticamente las relaciones relevantes:

- **Productos**: Incluyen marca, categoría, color, imágenes y tallas
- **Usuarios**: Incluyen direcciones y órdenes de compra
- **Órdenes**: Incluyen detalles completos con productos
- **Marcas/Categorías/Colores**: Incluyen productos relacionados

### Paginación
Todos los endpoints GET soportan parámetros de paginación:
```
GET /api/v1/products?page=1&limit=10&sortBy=name&sortOrder=asc
```

### Autenticación
La mayoría de endpoints requieren autenticación JWT:
```bash
Authorization: Bearer <tu_token_jwt>
```

### Ejemplo de Respuesta (Producto)
```json
{
  "data": [
    {
      "id": 1,
      "name": "Nike Air Max",
      "price": 150.00,
      "description": "Zapatillas deportivas",
      "stock": 25,
      "brand": {
        "id": 1,
        "name": "Nike"
      },
      "category": {
        "id": 1,
        "name": "Deportivas",
        "type": {
          "id": 1,
          "name": "Calzado"
        }
      },
      "colour": {
        "id": 1,
        "name": "Negro",
        "value": "#000000"
      },
      "images": [...],
      "sizes": [...]
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Estructura del proyecto
```
ecommerce-api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── controllers/          # Controladores de rutas
│   ├── routes/              # Definición de rutas
│   ├── services/            # Lógica de negocio
│   │   ├── auth/           # Servicios de autenticación
│   │   └── prisma/         # Configuración de Prisma
│   ├── models/             # Interfaces TypeScript
│   ├── middleware/         # Middleware personalizado
│   ├── types/              # Tipos compartidos
│   ├── app.ts              # Configuración de Express
│   └── server.ts           # Punto de entrada
├── .env                    # Variables de entorno
├── docker-compose.yml      # Configuración de Docker
├── package.json
├── tsconfig.json
└── README.md
```

## Tecnologías Utilizadas

- **Node.js** + **TypeScript** 
- **Express.js** 
- **Prisma** 
- **PostgreSQL** 
- **Docker** 
- **JWT** 
- **bcrypt** 

## Notas adicionales

- Todas las relaciones se cargan automáticamente
- Paginación por defecto: 10 elementos por página
- Autenticación requerida para operaciones CRUD
- Validación automática de tipos con TypeScript
- Manejo de errores centralizado 
