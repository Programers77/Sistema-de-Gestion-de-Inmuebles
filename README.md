🏠 Sistema de Gestión de Inmuebles

Full Stack Application - React + Node.js + PostgreSQL
https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react
https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js
https://img.shields.io/badge/Express-4.18-000000?logo=express
https://img.shields.io/badge/PostgreSQL-14.x-336791?logo=postgresql
https://img.shields.io/badge/Sequelize-6.32-52B0E7?logo=sequelize
https://img.shields.io/badge/JWT-Auth-000000?logo=json-web-tokens

📖 Descripción
Sistema completo de gestión de inmuebles que permite administrar usuarios y propiedades inmobiliarias. Incluye autenticación JWT, roles de usuario (admin, vendedor, cliente), y operaciones CRUD completas tanto para usuarios como para propiedades.

✨ Características
Backend

✅ Autenticación con JWT

✅ Registro y login de usuarios

✅ CRUD completo de usuarios (solo admin)

✅ CRUD completo de propiedades

✅ Roles: Admin, Vendedor, Cliente

✅ Filtrado de propiedades por estado

✅ Documentación interactiva con Swagger

✅ Base de datos PostgreSQL con Sequelize ORM

✅ Contraseñas encriptadas con bcrypt

Frontend
✅ Interfaz moderna con CSS

✅ Gestión de usuarios

✅ Gestión de propiedades

✅ Filtrado y búsqueda

✅ Diseño responsive


🛠 Tecnologías
Backend
Node.js

Express.js

PostgreSQL

Sequelize ORM

JWT (JSON Web Tokens)

Bcrypt

Swagger UI

CORS

Frontend
React 18

TypeScript

Axios

React Router DOM

Context API

🚀 Instalación
Requisitos Previos
Node.js (v18 o superior)

PostgreSQL (v18)

npm o yarn

Pasos de Instalación
Clonar el repositorio

bash
git clone https://github.com/tuusuario/Sistema-de-Gestion-de-Inmuebles.git
cd proyecto
Configurar Backend

bash
cd backend
npm install
npm run dev
Configurar Frontend

bash
cd ../frontend
npm install
npm run dev
Configurar Base de Datos

⚙️ Configuración
Backend (.env)
env
PORT=3001
DB_NAME=inmuebles_db
DB_USER=postgres
DB_PASSWORD=20011806
DB_HOST=localhost
DB_PORT=5432
JWT_SECRET=tu_secreto_jwt

Frontend (.env)
env
VITE_API_URL=http://localhost:3001/api
🎮 Uso
Iniciar Backend
bash
cd backend
npm run dev
# Servidor en http://localhost:3001
# Documentación Swagger: http://localhost:3001/api-docs
Iniciar Frontend
bash
cd frontend
npm run dev
# Aplicación en http://localhost:3000

Credenciales de Prueba
json
{
  "email": "admin@test.com",
  "password": "123456"
}

📡 API Endpoints
Autenticación
Método	Endpoint	Descripción	Acceso
POST	/api/auth/register	Registrar usuario	Público
POST	/api/auth/login	Iniciar sesión	Público
Usuarios
Método	Endpoint	Descripción	Acceso
GET	/api/users	Listar usuarios	Admin
GET	/api/users/:id	Ver usuario	Autenticado
POST	/api/users	Crear usuario	Admin
PUT	/api/users/:id	Actualizar usuario	Autenticado
DELETE	/api/users/:id	Eliminar usuario	Admin
Propiedades
Método	Endpoint	Descripción	Acceso
GET	/api/properties	Listar propiedades	Público
GET	/api/properties/:id	Ver propiedad	Público
POST	/api/properties	Crear propiedad	Autenticado
PUT	/api/properties/:id	Actualizar propiedad	Autenticado
DELETE	/api/properties/:id	Eliminar propiedad	Autenticado
Filtros
text
GET /api/properties?estado=disponible
GET /api/properties?estado=vendido
GET /api/properties?ciudad=Caracas
GET /api/properties?tipo=casa
