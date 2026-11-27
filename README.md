# API REST E-Commerce — Proyecto Final Node.js

API RESTful modularizada desarrollada con Node.js, Express, Firebase Firestore y JSON Web Tokens (JWT) para la gestión del catálogo de productos con seguridad basada en tokens. Desplegable en la nube mediante Vercel.

---

## 🛠️ Tecnologías y Dependencias

- **Entorno de Ejecución**: Node.js (ESModules `"type": "module"`)
- **Framework Web**: Express.js
- **Base de Datos**: Firebase / Cloud Firestore
- **Autenticación**: JSON Web Token (`jsonwebtoken`)
- **Seguridad y CORS**: `cors`
- **Variables de Entorno**: `dotenv`
- **Despliegue**: Vercel (`@vercel/node`)

---

## 📂 Arquitectura del Proyecto

El proyecto sigue el patrón de arquitectura **en capas** (Routes, Controllers, Services, Models) para garantizar una clara separación de responsabilidades:

```text
├── src/
│   ├── config/
│   │   └── firebase.js          # Configuración del SDK de Firebase
│   ├── models/
│   │   └── products.model.js    # Consultas a la colección de Firestore
│   ├── services/
│   │   └── products.service.js  # Lógica de negocio del dominio
│   ├── controllers/
│   │   ├── products.controller.js # Manejo de solicitudes y respuestas de productos
│   │   └── auth.controller.js     # Generación de token JWT al autenticarse
│   ├── routes/
│   │   ├── products.routes.js    # Rutas relativas a los productos
│   │   └── auth.routes.js        # Rutas de autenticación
│   └── middlewares/
│       └── auth.middleware.js    # Middleware de verificación Bearer Token JWT
├── .env                          # Variables de entorno locales
├── .gitignore                    # Archivos y carpetas omitidas en el control de versiones
├── index.js                      # Punto de entrada y servidor Express principal
├── package.json                  # Definición de dependencias y scripts de ejecución
└── vercel.json                   # Configuración para el despliegue serverless en Vercel
```


---

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz de tu proyecto con las siguientes variables:

- `PORT`: Puerto de ejecución local (ej. 3000)
- `FIREBASE_API_KEY`: Clave API de tu proyecto en Firebase
- `FIREBASE_AUTH_DOMAIN`: Dominio de autenticación de Firebase
- `FIREBASE_PROJECT_ID`: ID único de tu proyecto Firebase
- `FIREBASE_STORAGE_BUCKET`: Bucket de almacenamiento
- `FIREBASE_MESSAGING_SENDER_ID`: ID de remitente
- `FIREBASE_APP_ID`: ID de la aplicación web Firebase
- `JWT_SECRET_KEY`: Clave secreta para firmar los tokens JWT

---

## 🚀 Instalación y Ejecución Local

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DE_TU_REPOSITORIO_GITHUB>
   cd api-rest-node-proyecto-final
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor local**:
   ```bash
   npm start
   ```
   *El servidor responderá en `http://localhost:3000`.*

---

## 📡 Guía de Servicios y Endpoints (Pruebas con Postman)

### 1. Autenticación (`/auth`)

#### `POST /auth/login` — Iniciar Sesión y Generar Token
Genera un token de autenticación JWT necesario para acceder a las rutas protegidas.

- **URL**: `http://localhost:3000/auth/login`
- **Método**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body (raw JSON)**:
  ```json
  {
    "email": "tu_email@ejemplo.com",
    "password": "tu_password"
  }
  ```
- **Respuesta Exitosa (`200 OK`)**:
  ```json
  {
    "token": "Bearer <TOKEN_JWT_GENERADO>"
  }
  ```

---

### 2. Catálogo de Productos (`/api/products`)

#### `GET /api/products` — Obtener Todos los Productos (Público)
Devuelve el listado completo de productos almacenados en Cloud Firestore.

- **URL**: `http://localhost:3000/api/products`
- **Método**: `GET`
- **Respuesta Exitosa (`200 OK`)**:
  ```json
  [
    {
      "id": "ID_FIRESTORE_1",
      "title": "Teclado Mecánico RGB",
      "price": 12500
    }
  ]
  ```

---

#### `GET /api/products/:id` — Obtener Producto por ID (Público)
Devuelve los detalles de un producto en particular especificando su ID de Firestore.

- **URL**: `http://localhost:3000/api/products/ID_FIRESTORE_1`
- **Método**: `GET`
- **Respuesta Exitosa (`200 OK`)**:
  ```json
  {
    "id": "ID_FIRESTORE_1",
    "title": "Teclado Mecánico RGB",
    "price": 12500
  }
  ```
- **Respuesta Error (`404 Not Found`)**:
  ```json
  {
    "message": "Producto no encontrado"
  }
  ```

---

#### `POST /api/products/create` — Crear Producto (Protegido 🔒)
Agrega un nuevo documento a la colección `products` en Firestore. Requiere token Bearer.

- **URL**: `http://localhost:3000/api/products/create`
- **Método**: `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <TU_TOKEN_JWT>`
- **Body (raw JSON)**:
  ```json
  {
    "title": "Monitor Gamer 27 Pulgadas",
    "price": 85000
  }
  ```
- **Respuesta Exitosa (`201 Created`)**:
  ```json
  {
    "id": "ID_FIRESTORE_NUEVO",
    "title": "Monitor Gamer 27 Pulgadas",
    "price": 85000
  }
  ```

---

#### `DELETE /api/products/:id` — Eliminar Producto (Protegido 🔒)
Elimina de manera permanente un producto registrado en Firestore mediante su ID. Requiere token Bearer.

- **URL**: `http://localhost:3000/api/products/ID_FIRESTORE_NUEVO`
- **Método**: `DELETE`
- **Headers**:
  - `Authorization: Bearer <TU_TOKEN_JWT>`
- **Body**: `none`
- **Respuesta Exitosa (`200 OK`)**:
  ```json
  {
    "message": "Producto eliminado correctamente"
  }
  ```

---

## ☁️ Despliegue en Vercel

1. Incluye el archivo de configuración `vercel.json` en la raíz de la aplicación:
   ```json
   {
     "builds": [
       {
         "src": "./index.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/"
       }
     ]
   }
   ```
2. Realiza un `commit` e impulsa los cambios hacia tu repositorio en GitHub.
3. Importa tu proyecto desde el panel de Vercel.
4. Registra cada una de tus variables de entorno dentro de la configuración del proyecto en Vercel.
5. Inicia el proceso haciendo clic en **Deploy**.

---

## 🚥 Mapeo de Códigos de Estado HTTP

| Código | Estado | Descripción |
| :--- | :--- | :--- |
| `200 OK` | Petición Exitosa | Petición GET, DELETE o Login procesada correctamente. |
| `201 Created` | Creado | Producto guardado con éxito en Firestore. |
| `400 Bad Request` | Petición Inválida | Faltan campos obligatorios en el cuerpo del JSON. |
| `401 Unauthorized` | No Autorizado | Credenciales incorrectas o token no enviado. |
| `403 Forbidden` | Acceso Denegado | Token expirado o cabecera con formato Bearer inválido. |
| `404 Not Found` | No Encontrado | Recurso o endpoint inexistente. |
| `500 Internal Server Error` | Error de Servidor | Error no controlado en la aplicación o fallo en Firestore. |
