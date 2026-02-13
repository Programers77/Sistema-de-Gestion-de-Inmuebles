const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gestión de Inmuebles',
      version: '1.0.0',
      description: 'Documentación completa de la API para gestión de usuarios y propiedades inmobiliarias',
      contact: {
        name: 'Soporte',
        email: 'soporte@inmuebles.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de Desarrollo'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            nombre: { type: 'string' },
            email: { type: 'string' },
            rol: { type: 'string', enum: ['admin', 'vendedor', 'cliente'] },
            telefono: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        Property: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            titulo: { type: 'string' },
            descripcion: { type: 'string' },
            precio: { type: 'number' },
            direccion: { type: 'string' },
            ciudad: { type: 'string' },
            tipo: { type: 'string', enum: ['casa', 'apartamento', 'local', 'terreno'] },
            habitaciones: { type: 'integer' },
            banos: { type: 'integer' },
            area: { type: 'number' },
            estado: { type: 'string', enum: ['disponible', 'vendido', 'reservado'] },
            userId: { type: 'integer' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'admin@test.com' },
            password: { type: 'string', example: '123456' }
          }
        },
        RegisterRequest: {
          type: 'object',
          required: ['nombre', 'email', 'password'],
          properties: {
            nombre: { type: 'string', example: 'Administrador' },
            email: { type: 'string', example: 'admin@test.com' },
            password: { type: 'string', example: '123456' },
            telefono: { type: 'string', example: '04121234567' },
            rol: { type: 'string', enum: ['admin', 'vendedor', 'cliente'], example: 'cliente' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // Asegúrate que esta ruta es correcta
};

module.exports = swaggerJsdoc(options);